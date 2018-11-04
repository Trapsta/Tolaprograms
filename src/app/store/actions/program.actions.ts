import { Action } from '@ngrx/store';

export enum ProgramActionTypes {
  LoadPrograms = '[Program] Load Programs'
}

export class LoadPrograms implements Action {
  readonly type = ProgramActionTypes.LoadPrograms;
}

export type ProgramActions = LoadPrograms;
