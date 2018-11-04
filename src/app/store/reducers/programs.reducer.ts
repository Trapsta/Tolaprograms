import { Action } from '@ngrx/store';
import Program from '../../models/programs.model';
import * as programActions from '../actions/program.actions';

export interface State {
	programs : Program[],

}

export const initialState: State = {
	programs: [],

};

export function reducer(state = initialState, action: programActions.ProgramsLoadedAction): State {
  switch (action.type) {
  	case programActions.ProgramsActionTypes.PROGRAMS_LOADED:
  		return {
  			...state,
  			programs: action.payload
  		};

    default:
      return state;
  }
}


export const getStatePrograms = (state: State) => state.programs;