import { Action } from '@ngrx/store';
import Activity from '../../models/activities.model';
import * as activityActions from '../actions/activity.actions';


export interface State {
	activities: Activity[],

}

export const initialState: State = {
	activities: [],

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
  			activities: [...state.activities, ...action.payload.pulledItem]
  		};
  	case activityActions.ActivityActionTypes.ACTIVITY_DELETED:
  		let updatedActivities = [...state.activities]
  		updatedActivities.splice(
  			updatedActivities.map((activity) => {
  				return activity.id;
  			}).indexOf(action.payload.activityId)
  			,1);
  		return {
  			...state,
  			activities: updatedActivities
  		};
  	default:
      return state;
  }
}


export const getStateActivities = (state: State) => state.activities;
