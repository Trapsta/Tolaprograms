import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromPrograms from './programs.reducer';
import * as fromActivities from './activities.reducer';

export interface State {

  programs: fromPrograms.State;
  activities: fromActivities.State;
}


export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any): any => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const reducers: ActionReducerMap<State> = {

  programs: fromPrograms.reducer,
  activities: fromActivities.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
