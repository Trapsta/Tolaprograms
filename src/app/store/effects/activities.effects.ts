import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as activityActions from '../actions/activity.actions';
import { Action } from '@ngrx/store';
import { Http } from '@angular/http';
import { config } from '../../utils/config';
import { catchError, map, startWith, switchMap, mergeMap  } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';
import Activity from '../../models/activities.model';
import { AppService } from '../../app.service';


@Injectable()
export class ActivitiesEffects {

	activtyIdInProgress: number;

  constructor(private actions$: Actions, private http: Http , private AppService : AppService) {}

  @Effect()
  loadActivitiesEffect$ = this.actions$.pipe(
    ofType<activityActions.LoadActivitiesAction>(
    	activityActions.ActivityActionTypes.LOAD_ACTIVITIES
    	),
    startWith(new activityActions.LoadActivitiesAction()),
    switchMap(() => {
      return this.AppService.getActivities()
        .pipe(
          map((result) => {
            /*
              Save to local storage for offline access
            */
            localStorage.setItem('activities', JSON.stringify(result));
            return ({ type: activityActions.ActivityActionTypes.ACTIVITIES_LOADED, payload: result })
          })
        )
    })
  );


  // @Effect()
  // addactivity$ = this.actions$.pipe(
  // 	ofType<activityActions.AddActivityAction>(
  // 		activityActions.ActivityActionTypes.ADD_ACTIVITY
  // 		),
  // 	startWith(new activityActions.AddActivityAction()),
  // 	switchMap((payload) => {
  // 		return this.AppService.addActivity(payload)
  // 		.pipe(
  // 			map((result) => {
  // 				return ({ type: activityActions.ActivityActionTypes.ACTIVITY_ADDED, payload: {loadedActivity: result} })
  // 			})
  // 		)
  // 	})
  // );


  // @Effect()
  // deleteActivity$ = this.actions$.pipe(
  // 	ofType<activityActions.DeleteActivityAction>(
  // 		activityActions.ActivityActionTypes.DELETE_ACTIVITY
  // 		),
  // 	startWith(new activityActions.DeleteActivityAction(this.activtyIdInProgress)),
  // 	switchMap((action) => {
  // 		return this.AppService.deleteActivity(action.payload)
  // 		.pipe(
  // 			map((result) => 
  // 				this.activtyIdInProgress = action.payload  				
  // 			),
  // 			switchMap((result) => {
  // 				return ({ type: activityActions.ActivityActionTypes.ACTIVITY_DELETED , payload: {activityId: this.activtyIdInProgress} })
  // 			})
  // 		)
  // 	})
  // );


}
