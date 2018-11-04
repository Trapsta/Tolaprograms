import { Component, OnInit } from '@angular/core';
import Program from './models/programs.model';
import { Store } from '@ngrx/store';
import * as fromRoot from './store/reducers';
import * as programActions from './store/actions/program.actions';
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


  constructor(private store: Store<fromRoot.State>) {
  	this.programs = []
  	//this.programs$ = store.select("programs");
  	store.select("programs").subscribe((value) => {
  		this.programs = value.programs
  	});

  }


  ngOnInit() {
  	this.store.dispatch(new programActions.LoadProgramsAction());
  }


}
