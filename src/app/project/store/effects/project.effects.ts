import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import {
  catchError,
  filter,
  map,
  mergeMap,
  mergeMapTo,
  withLatestFrom,
  tap,
  mapTo
} from 'rxjs/operators'
import { getUser } from 'src/app/auth/store/selectors/auth.selectors'
import { ProjectService } from 'src/app/services/project.service'
import { AppState } from 'src/app/store'
import {
  AddProjectAction,
  AddProjectFailAction,
  AddProjectSuccessAction,
  DeleteProjectAction,
  DeleteProjectFailAction,
  DeleteProjectSuccessAction,
  LoadAllProjectsAction,
  LoadAllProjectsFailAction,
  LoadAllProjectsSuccessAction,
  NeedAllProjectsAction,
  ProjectActions,
  ProjectActionTypes,
  UpdateProjectAction,
  UpdateProjectFailAction,
  UpdateProjectSuccessAction
} from '../actions/project.actions'
import { getAllProjectsIsLoaded } from '../selectors/projects.selectors'
import { UpdateUserAction } from 'src/app/auth/store/actions/user.actions'
import { uniq } from 'lodash'

@Injectable()
export class ProjectEffects {
  @Effect()
  needAllProjects$: Observable<ProjectActions> = this.actions$.pipe(
    ofType<NeedAllProjectsAction>(ProjectActionTypes.NEED_ALL_PROJECTS),
    mergeMapTo(
      this.store.pipe(
        select(getUser),
        withLatestFrom(this.store.pipe(select(getAllProjectsIsLoaded))),
        filter(([user, loaded]) => !!user && !loaded),
        map(([user, loaded]) => new LoadAllProjectsAction({ userId: user.id }))
      )
    )
  )

  @Effect()
  loadAllProjects$: Observable<ProjectActions> = this.actions$.pipe(
    ofType<LoadAllProjectsAction>(ProjectActionTypes.LOAD_ALL_PROJECTS),
    map(action => action.payload.userId),
    mergeMap(userId =>
      this.projectService.getProjectsByUserId(userId).pipe(
        map(projects => new LoadAllProjectsSuccessAction({ projects })),
        catchError(() => of(new LoadAllProjectsFailAction()))
      )
    )
  )

  @Effect()
  addProject$: Observable<ProjectActions> = this.actions$.pipe(
    ofType<AddProjectAction>(ProjectActionTypes.ADD_PROJECT),
    map(action => action.payload.project),
    mergeMap(project =>
      this.projectService.add(project).pipe(
        map(project => new AddProjectSuccessAction({ project })),
        catchError(() => of(new AddProjectFailAction()))
      )
    )
  )

  @Effect()
  deleteProject$: Observable<ProjectActions> = this.actions$.pipe(
    ofType<DeleteProjectAction>(ProjectActionTypes.DELETE_PROJECT),
    map(action => action.payload.project),
    mergeMap(project =>
      this.projectService.delete(project).pipe(
        map(project => new DeleteProjectSuccessAction({ project })),
        catchError(() => of(new DeleteProjectFailAction()))
      )
    )
  )

  @Effect()
  updateProject$: Observable<ProjectActions> = this.actions$.pipe(
    ofType<UpdateProjectAction>(ProjectActionTypes.UPDATE_PROJECT),
    map(action => action.payload),
    mergeMap(project =>
      this.projectService.update(project).pipe(
        map(
          projectUpdated =>
            new UpdateProjectSuccessAction({ id: projectUpdated.id, changes: projectUpdated })
        ),
        catchError(() => of(new UpdateProjectFailAction()))
      )
    )
  )

  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private store: Store<AppState>
  ) {}
}
