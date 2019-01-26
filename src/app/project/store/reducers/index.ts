import { ProjectsState, projectsReducer } from './projects.reducer'
import { ActionReducerMap } from '@ngrx/store'

export interface ProjectFeatureState {
  projects: ProjectsState
}

export const projectFeatureReducers: ActionReducerMap<ProjectFeatureState> = {
  projects: projectsReducer
}
