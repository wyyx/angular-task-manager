import { ProjectsState, projectsReducer } from './reducers/project.reducer'
import { ActionReducerMap } from '@ngrx/store'
import { ProjectEffects } from './effects/project.effects'

export interface ProjectFeatureState {
  projects: ProjectsState
}

export const projectFeatureReducers: ActionReducerMap<ProjectFeatureState> = {
  projects: projectsReducer
}

export const projectFeatureEffects = [ProjectEffects]
