import { Component, OnInit } from '@angular/core';
import Program from './models/programs.model';
import { Store } from '@ngrx/store';
import * as fromRoot from './store/reducers';
import * as programActions from './store/actions/program.actions';
import * as activityActions from './store/actions/activity.actions';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'tolaprograms';
  //programs$ : Observable<any>;
  programs : Program[];
  activities : Activity[];


  constructor(private store: Store<fromRoot.State>) {
  	this.programs = []
    this.activities = []


    store.subscribe(state => {
      this.programs = state.programs.programs
      this.activities = state.activities.activities

      /*
        Note: you can use the parameter `workflowlevel1__id` to filter workflowlevel2 (Projects) list
        by workflowlevel1 (Program) Id OR you can fetch the data from both endpoints and do the
        filtering in the frontend, both ways work for us.
        Example : https://dev.toladata.io/api/workflowlevel2/?workflowlevel1__id=94
      */

      this.programs.map((program) => {
        program.activities = [];
        program.activities = this.activities.filter((activity) => {
          //console.log(activity);
          return (activity.workflowlevel1 === program.url)
        });
      });
    });    

  }


  ngOnInit() {
  	this.store.dispatch(new programActions.LoadProgramsAction());
    this.store.dispatch(new activityActions.LoadActivitiesAction());
  }


}
