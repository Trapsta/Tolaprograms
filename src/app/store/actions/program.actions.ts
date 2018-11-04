import { Action } from '@ngrx/store';
import Program from '../../models/programs.model';

export enum ProgramsActionTypes {
  LOAD_PROGRAMS = '[Programs] Load Programs',
  PROGRAMS_LOADED = '[Programs] Programs Loaded',
  LOAD_PROGRAMS_ERROR = '[Programs] Load Program Error'

}

export class LoadProgramsAction implements Action {
  readonly type = ProgramsActionTypes.LOAD_PROGRAMS;  
}

export class ProgramsLoadedAction implements Action {
  readonly type = ProgramsActionTypes.PROGRAMS_LOADED;
  constructor(public payload: Program[]) {}
}

export class LoadProgramsErrorAction implements Action {
  readonly type = ProgramsActionTypes.LOAD_PROGRAMS_ERROR;
}

export type ProgramsActions = LoadProgramsAction | ProgramsLoadedAction | LoadProgramsErrorAction;