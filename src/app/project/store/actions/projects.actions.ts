import { Action } from '@ngrx/store'
import { Project } from 'src/app/domain/project.model'
import { Update } from '@ngrx/entity'

export enum ProjectActionTypes {
  NEED_ALL_PROJECTS = '[Project] need all projects',
  LOAD_ALL_PROJECTS = '[Project] load all projects',
  LOAD_ALL_PROJECTS_SUCCESS = '[Project] load all projects success',
  LOAD_ALL_PROJECTS_FAIL = '[Project] load all projects fail',

  // Add project
  ADD_PROJECT = '[Project] add project',
  ADD_PROJECT_SUCCESS = '[Project] add project success',
  ADD_PROJECT_FAIL = '[Project] add project fail',
  // Delete project
  DELETE_PROJECT = '[Project] delete project',
  DELETE_PROJECT_SUCCESS = '[Project] delete project success',
  DELETE_PROJECT_FAIL = '[Project] delete project fail',
  // Update project
  UPDATE_PROJECT = '[Project] update project',
  UPDATE_PROJECT_SUCCESS = '[Project] update project success',
  UPDATE_PROJECT_FAIL = '[Project] update project fail'
}

export class NeedAllProjectsAction implements Action {
  readonly type = ProjectActionTypes.NEED_ALL_PROJECTS
}

export class LoadAllProjectsAction implements Action {
  readonly type = ProjectActionTypes.LOAD_ALL_PROJECTS

  constructor(public payload: { userId: string }) {}
}

export class LoadAllProjectsSuccessAction implements Action {
  readonly type = ProjectActionTypes.LOAD_ALL_PROJECTS_SUCCESS

  constructor(public payload: { projects: Project[] }) {}
}

export class LoadAllProjectsFailAction implements Action {
  readonly type = ProjectActionTypes.LOAD_ALL_PROJECTS_FAIL
}

// Add project
export class AddProjectAction implements Action {
  readonly type = ProjectActionTypes.ADD_PROJECT

  constructor(public payload: { project: Project }) {}
}

export class AddProjectSuccessAction implements Action {
  readonly type = ProjectActionTypes.ADD_PROJECT_SUCCESS

  constructor(public payload: { project: Project }) {}
}

export class AddProjectFailAction implements Action {
  readonly type = ProjectActionTypes.ADD_PROJECT_FAIL
}

// Delete project
export class DeleteProjectAction implements Action {
  readonly type = ProjectActionTypes.DELETE_PROJECT

  constructor(public payload: { project: Project }) {}
}

export class DeleteProjectSuccessAction implements Action {
  readonly type = ProjectActionTypes.DELETE_PROJECT_SUCCESS

  constructor(public payload: { project: Project }) {}
}

export class DeleteProjectFailAction implements Action {
  readonly type = ProjectActionTypes.DELETE_PROJECT_FAIL
}

// Update project
export class UpdateProjectAction implements Action {
  readonly type = ProjectActionTypes.UPDATE_PROJECT

  constructor(public payload: Update<Project>) {}
}

export class UpdateProjectSuccessAction implements Action {
  readonly type = ProjectActionTypes.UPDATE_PROJECT_SUCCESS

  constructor(public payload: Update<Project>) {}
}

export class UpdateProjectFailAction implements Action {
  readonly type = ProjectActionTypes.UPDATE_PROJECT_FAIL
}

export type ProjectActions =
  | NeedAllProjectsAction
  | LoadAllProjectsAction
  | LoadAllProjectsSuccessAction
  | LoadAllProjectsFailAction
  | AddProjectAction
  | DeleteProjectAction
  | UpdateProjectAction
  | AddProjectSuccessAction
  | AddProjectFailAction
  | DeleteProjectSuccessAction
  | DeleteProjectFailAction
  | UpdateProjectSuccessAction
  | UpdateProjectFailAction
