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
          })
        )
    })
  );


}
