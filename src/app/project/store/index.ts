import { ProjectState, projectReducer } from './reducers/project.reducer'
import { ActionReducerMap } from '@ngrx/store'
import { ProjectEffects } from './effects/project.effects'

export interface ProjectFeatureState {
  projects: ProjectState
}

export const projectFeatureReducers: ActionReducerMap<ProjectFeatureState> = {
  projects: projectReducer
}

export const projectFeatureEffects = [ProjectEffects]
