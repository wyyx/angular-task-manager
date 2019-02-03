import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { Project } from 'src/app/domain/project.model'
import { ProjectActions, ProjectActionTypes } from '../actions/project.actions'

export interface ProjectState extends EntityState<Project> {
  loading: boolean
}

export const projectAdapter: EntityAdapter<Project> = createEntityAdapter<Project>()

export const initialProjectState = projectAdapter.getInitialState({
  loading: false
})

export function projectReducer(state = initialProjectState, action: ProjectActions) {
  switch (action.type) {
    case ProjectActionTypes.LOAD_ALL_PROJECTS:
      return { ...state, loading: true }
    case ProjectActionTypes.LOAD_ALL_PROJECTS_SUCCESS:
      return projectAdapter.addAll(action.payload.projects, { ...state, loading: false })
    case ProjectActionTypes.LOAD_ALL_PROJECTS_FAIL:
      return { ...state, loading: false }
    case ProjectActionTypes.ADD_PROJECT_SUCCESS:
      return projectAdapter.addOne(action.payload.project, state)
    case ProjectActionTypes.UPDATE_PROJECT_SUCCESS:
      return projectAdapter.updateOne(action.payload, state)
    case ProjectActionTypes.DELETE_PROJECT_SUCCESS:
      return projectAdapter.removeOne(action.payload.project.id, state)
    default:
      return state
      break
  }
}
