import { Action } from '@ngrx/store';
import Activity from '../../models/activities.model';
import * as activityActions from '../actions/activity.actions';


export interface State {
	activities: Activity[],
  flashMessage : string

}

export const initialState: State = {
	activities: [],
  flashMessage : ''

};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {    
  	case activityActions.ActivityActionTypes.ACTIVITIES_LOADED:
  		return {
  			...state,
  			activities: action.payload
  		};
  	case activityActions.ActivityActionTypes.ACTIVITY_ADDED:
  		return {
  			...state,
  			activities: [...state.activities, ...action.payload],
        flashMessage : "Success: Activity added"
  		};
  	case activityActions.ActivityActionTypes.ACTIVITY_DELETED:
      return {...state,
        activities: state.activities.filter(activity => activity.id !== action.payload),
        flashMessage : "Success: Activity deleted"}
  	default:
      return state;
  }
}


export const getStateActivities = (state: State) => state.activities;
