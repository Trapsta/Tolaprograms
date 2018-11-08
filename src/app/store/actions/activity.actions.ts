import { Action } from '@ngrx/store';
import Activity from '../../models/activities.model';

declare module '@ngrx/store' {
  interface Action {
    type: string;
    payload?: any;
  }
}

export enum ActivityActionTypes {
  LOAD_ACTIVITIES = '[Activity] Load Activities',
  ACTIVITIES_LOADED = '[Activity] Activities Loaded',
  ADD_ACTIVITY = '[Activity] Add Activity',
  ACTIVITY_ADDED = '[Activity] Activity Added',
  ADD_ACTIVITY_FAILURE = '[Activity] Add Activity Failure', 
  DELETE_ACTIVITY = '[Activity] Delete Activity',
  ACTIVITY_DELETED = '[Activity] Activity Deleted',
  LOAD_ACTIVITIES_ERROR = '[Activity] Load Activities Error'
}

export class LoadActivitiesAction implements Action {
  readonly type = ActivityActionTypes.LOAD_ACTIVITIES;
}

export class ActivitiesLoadedAction implements Action {
  readonly type = ActivityActionTypes.ACTIVITIES_LOADED;
  constructor(public payload: Activity[]) {}
}

export class AddActivityAction implements Action {
  readonly type = ActivityActionTypes.ADD_ACTIVITY;
  constructor(public payload: Activity[]) {}
}

export class ActivityAddedAction implements Action {
  readonly type = ActivityActionTypes.ACTIVITY_ADDED;
  constructor(public payload: Activity) {}
}

export class AddActivityFailure implements Action {
  readonly type = ActivityActionTypes.LOAD_ACTIVITIES_ERROR;
}

export class DeleteActivityAction implements Action {
  readonly type = ActivityActionTypes.DELETE_ACTIVITY;
  constructor(public payload: number) {}
}

export class ActivityDeletedAction implements Action {
  readonly type = ActivityActionTypes.ACTIVITY_DELETED;
  constructor(public payload: number) {}
}

export class LoadActivitiesError implements Action {
  readonly type = ActivityActionTypes.LOAD_ACTIVITIES_ERROR;
}


export type ActivityActions = LoadActivitiesAction | ActivitiesLoadedAction | AddActivityAction | ActivityAddedAction | AddActivityFailure | DeleteActivityAction | ActivityDeletedAction | LoadActivitiesError;
