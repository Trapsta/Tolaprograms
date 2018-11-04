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

export const reducers: ActionReducerMap<State> = {

  programs: fromPrograms.reducer,
  activities: fromActivities.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
