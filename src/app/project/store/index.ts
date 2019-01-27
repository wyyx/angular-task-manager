import { ProjectsState, projectsReducer } from './reducers/project.reducer'
import { ActionReducerMap } from '@ngrx/store'

export interface ProjectFeatureState {
  projects: ProjectsState
}

export const projectFeatureReducers: ActionReducerMap<ProjectFeatureState> = {
  projects: projectsReducer
}
