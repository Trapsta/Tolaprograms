import { Component, OnInit, Input } from '@angular/core';
import Activity from '../../models/programs.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import * as activityActions from './store/actions/activity.actions';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.sass']
})
export class ActivitiesComponent implements OnInit {
	@Input() activity: Activity;

  constructor(private store: Store<fromRoot.State>) {
  	store.select<fromRoot.State>('activities')
  }

  ngOnInit() {
  }

  removeActivty(activityId) {
    console.log(activityId)
    //this.store.dispatch({type : DELETE_ACTIVITY , payload : {activityId}})
  }

}
