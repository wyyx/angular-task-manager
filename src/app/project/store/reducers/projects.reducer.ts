import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { Project } from 'src/app/domain/project.model'
import { ProjectActions, ProjectActionTypes } from '../actions/projects.actions'

export interface ProjectsState extends EntityState<Project> {
  loading: boolean
}

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>()

export const initialProjectsState = adapter.getInitialState({
  loading: false
})

export function projectsReducer(state = initialProjectsState, action: ProjectActions) {
  switch (action.type) {
    case ProjectActionTypes.LOAD_ALL_PROJECTS:
      return { ...state, loading: true }
    case ProjectActionTypes.LOAD_ALL_PROJECTS_SUCCESS:
      return adapter.addAll(action.payload.projects, { ...state, loading: false })
    case ProjectActionTypes.LOAD_ALL_PROJECTS_FAIL:
      return { ...state, loading: false }
    case ProjectActionTypes.ADD_PROJECT_SUCCESS:
      return adapter.addOne(action.payload.project, state)
    case ProjectActionTypes.UPDATE_PROJECT_SUCCESS:
      return adapter.updateOne(action.payload, state)
    case ProjectActionTypes.DELETE_PROJECT_SUCCESS:
      return adapter.removeOne(action.payload.project.id, state)
    default:
      return state
      break
  }
}
