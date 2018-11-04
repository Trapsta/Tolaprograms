import { Action } from '@ngrx/store';

export enum ActivityActionTypes {
  LoadActivitys = '[Activity] Load Activitys'
}

export class LoadActivitys implements Action {
  readonly type = ActivityActionTypes.LoadActivitys;
}

export type ActivityActions = LoadActivitys;
