import { Action } from '@ngrx/store'
import { Project } from 'src/app/domain/project.model'
import { Update } from '@ngrx/entity'
import { User } from 'src/app/auth/models/user.model'

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
  UPDATE_PROJECT_FAIL = '[Project] update project fail',
  // Add or remove members
  ADD_OR_REMOVE_MEMBERS = '[Project] add or remove members',
  ADD_OR_REMOVE_MEMBERS_SUCCESS = '[Project] add or remove members success',
  ADD_OR_REMOVE_MEMBERS_FAIL = '[Project] add or remove members fail'
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

// Add or remove members
export class AddOrRemoveMembersAction implements Action {
  readonly type = ProjectActionTypes.ADD_OR_REMOVE_MEMBERS

  constructor(
    public payload: { projectId: string; previousMembers: User[]; currentMembers: User[] }
  ) {}
}

export class AddOrRemoveMembersSuccessAction implements Action {
  readonly type = ProjectActionTypes.ADD_OR_REMOVE_MEMBERS_SUCCESS
}

export class AddOrRemoveMembersFailAction implements Action {
  readonly type = ProjectActionTypes.ADD_OR_REMOVE_MEMBERS_FAIL
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
  | AddOrRemoveMembersAction
  | AddOrRemoveMembersSuccessAction
  | AddOrRemoveMembersFailAction
