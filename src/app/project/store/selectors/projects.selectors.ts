import { createFeatureSelector, createSelector } from '@ngrx/store'
import { projectAdapter, ProjectState } from '../reducers/project.reducer'
import { ProjectFeatureState } from '..'
import { AppState } from 'src/app/store'
import { getUser } from 'src/app/auth/store/selectors/auth.selectors'

export const { selectAll, selectEntities, selectIds, selectTotal } = projectAdapter.getSelectors()

export const getProjectFeatureState = createFeatureSelector<ProjectFeatureState>('project')

export const getProjectsState = createSelector(
  getProjectFeatureState,
  state => state.projects
)

export const getAllProjectsIsLoading = createSelector(
  getProjectsState,
  state => state.loading
)

export const getAllProjects = createSelector(
  getProjectsState,
  selectAll
)

export const getProjects = createSelector(
  getAllProjects,
  getUser,
  (projects, user) => (user ? projects.filter(p => p.members.includes(user.id)) : [])
)

export const getAllProjectsIsLoaded = createSelector(
  getAllProjects,
  projects => projects.length > 0
)
