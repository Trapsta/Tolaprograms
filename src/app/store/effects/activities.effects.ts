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

const toPayload = <T>(action: { payload: T }) => action.payload;


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
          }),
          catchError(() => observableOf(new activityActions.LoadActivitiesError()))
        )
    })
  );


  @Effect()
  loadCachedActivitiesEffect$ = this.actions$.pipe(
     ofType<activityActions.LoadActivitiesError>(activityActions.ActivityActionTypes.LOAD_ACTIVITIES_ERROR),
     map(action => {
      const activities = JSON.parse(localStorage.getItem('activities'))
      if (activities !== null) {
        console.warn('Cached Data: Activities')
        return ({ type: activityActions.ActivityActionTypes.ACTIVITIES_LOADED, payload: activities })
      } else {
        console.log('No activities in localstorage')
      }
    })
  );



  @Effect() addactivity$: Observable<Action> = this.actions$.pipe(
    ofType<activityActions.AddActivityAction>(activityActions.ActivityActionTypes.ADD_ACTIVITY),
    mergeMap(action => this.AppService.addActivity(action.payload).pipe(
      map(result => (new activityActions.ActivityAddedAction(result)))
    ))
  )
       


  @Effect() deleteActivity$: Observable<Action> = this.actions$.pipe(
    ofType<activityActions.DeleteActivityAction>(activityActions.ActivityActionTypes.DELETE_ACTIVITY),
    mergeMap(action => this.AppService.deleteActivity(action.payload).pipe(
      map(result => (new activityActions.ActivityDeletedAction(action.payload)))
    ))
  )


}
