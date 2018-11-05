import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as programActions from '../actions/program.actions';

import { Action } from '@ngrx/store';
import { Http } from '@angular/http';
import { config } from '../../utils/config';
import { catchError, map, startWith, switchMap, mergeMap  } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';

import Program from '../../models/programs.model';
import { AppService } from '../../app.service';


@Injectable()
export class ProgramsEffects {

  constructor(private actions$: Actions, private http: Http , private AppService : AppService) {}

  @Effect()
  loadProgramsEffect$ = this.actions$.pipe(
    ofType<programActions.LoadProgramsAction>(
    	programActions.ProgramsActionTypes.LOAD_PROGRAMS
    	),
    startWith(new programActions.LoadProgramsAction()),
    switchMap(() => {
      return this.AppService.getPrograms()
        .pipe(
          map((result) => {
            /*
              Save to local storage for Bonus Task 7 :)
            */
            localStorage.setItem('programs', JSON.stringify(result));
            return ({ type: programActions.ProgramsActionTypes.PROGRAMS_LOADED, payload: result })
          }),
          //catchError(error => new programActions.LoadProgramsErrorAction(error))
          catchError(() => observableOf(new programActions.LoadProgramsErrorAction()))
        )
    })

  );


  @Effect()
  loadCachedProgramsEffect$ = this.actions$.pipe(
     ofType<programActions.LoadProgramsErrorAction>(programActions.ProgramsActionTypes.LOAD_PROGRAMS_ERROR),
     map(action => {
      const programs = JSON.parse(localStorage.getItem('programs'))
      if (programs !== null) {
        console.warn('Cached Data: Programs')
        return ({ type: programActions.ProgramsActionTypes.PROGRAMS_LOADED, payload: programs })
      } else {
        return ({ type: programActions.ProgramsActionTypes.LOAD_PROGRAMS_FAILURE })
      }
    })
  );




  //  @Effect()
  // loadCachedProgramsEffect$ = this.actions$.pipe(
  //   ofType<programActions.LoadProgramsErrorAction>(
  //     programActions.ProgramsActionTypes.LOAD_PROGRAMS_ERROR
  //     ),
  //   startWith(new programActions.LoadProgramsErrorAction()),
  //   switchMap(() => {
  //     return this.AppService.getPrograms()
  //       .pipe(
  //         map((result) => {
  //           const programs = JSON.parse(localStorage.getItem('programs'))
  //           if (programs !== null) {
  //             return ({ type: programActions.ProgramsActionTypes.PROGRAMS_LOADED, payload: programs })
  //           } else {
  //             return ({ type: programActions.ProgramsActionTypes.LOAD_PROGRAMS_Failure })
  //           }
  //         }),
  //         //catchError(error => new programActions.LoadProgramsErrorAction(error))
  //         catchError(() => observableOf(new programActions.LoadProgramsErrorAction()))
  //       )
  //     //   .catch((error) => {
  //     //   const programs = JSON.parse(localStorage.getItem('programs'));
  //     //   console.warn('cached data:');
  //     //   console.log(programs);
  //     //   if (programs !== null) {
  //     //     return ({ type: programActions.ProgramsActionTypes.PROGRAMS_LOADED, payload: programs })
  //     //   }
  //     //     return ({ type: programActions.ProgramsActionTypes.LOAD_PROGRAMS_ERROR, payload: error })
  //     // })
  //   })

  // );


}
