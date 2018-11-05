import { Component, OnInit, Input } from '@angular/core';
import Program from '../../models/programs.model';
import Activity from '../../models/programs.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as activityActions from '../../store/actions/activity.actions';
import { NgbDateFRParserFormatter } from '../../utils/dateformats';
import { NgbDatepickerConfig, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.sass'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}
   ]
})
export class ProgramsComponent implements OnInit {
	 @Input() program : Program ;
   @Input() Activity : Activity ;
	 name : string;
	 startdate : string;
	 enddate : string;
	 showForm : boolean;
	 formSubmitted : boolean;
	 rForm: FormGroup;

  constructor(private store: Store<fromRoot.State> , private fb: FormBuilder) {
  	this.showForm = false;
    this.formSubmitted = false ;
    store.select<fromRoot.State>('activities')
    this.rForm = fb.group({
      'name' : [null, Validators.required],
      'startdate' : [null ,  Validators.nullValidator],
      'enddate' : [null ,  Validators.nullValidator]
    });
  }

  ngOnInit() {
  }

  toggleForm() {
   this.showForm = !this.showForm ;
  }

  addActivity(value) {
    this.formSubmitted = true
    if (this.rForm.invalid) {
      return false;
    }

    /*
      Hints:
      - use an npm module to convert the date to the api date format (e.g moment.js)
    */
    let startdateValue = moment([value.startdate.day, value.startdate.month, value.startdate.year], "DD-MM-YYYY");
    let enddateValue = moment([value.enddate.day, value.enddate.month, value.enddate.year], "DD-MM-YYYY");      

    console.log(startdateValue);
    //this.store.dispatch(new activityActions.AddActivityAction(payload));
    this.store.dispatch({      
      type: activityActions.ActivityActionTypes.ADD_ACTIVITY,
      payload: {
        name: value.name,
        workflowlevel1: this.program.url,
        expected_start_date: startdateValue,
        expected_end_date: enddateValue
      }
    });
    this.toggleForm();
  	
  }

  

}
