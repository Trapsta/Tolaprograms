import { Component, OnInit, Input } from '@angular/core';
import Program from '../../models/programs.model';
import Activity from '../../models/programs.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.sass']
})
export class ProgramsComponent implements OnInit {
	 @Input() program : Program ;
	 name : string;
	 startdate : string;
	 enddate : string;
	 showForm : boolean;
	 formSubmitted : boolean;
	 rForm: FormGroup;

  constructor(private store: Store<fromRoot.State> , private fb: FormBuilder) {
  	this.showForm = false;
    this.formSubmitted = false ;
    store.select<AppState>('mainReducer')
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

  add(value) {
    this.formSubmitted = true
    if (this.rForm.invalid) {
      return false;
    }
    // this.store.dispatch({ type: 'ADD_ACTIVITY', payload: {
    //     "name": value.name,
    //     "workflowlevel1": this.program.url,
    //     "expected_start_date": new Date(value.startdate),
    //     "expected_end_date": new Date(value.enddate)
    //   } });
  	
  }

  

}
