import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import Program from './models/programs.model';
import Activity from './models/activities.model';
import { config } from './utils/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

const API_URL = 'https://dev.toladata.io/api';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: Http) { }


  // API: GET /program
  public getPrograms(): Observable<Program[]> {
  	return this.http.get(API_URL + '/workflowlevel1', { headers: config })
    .map(response => {
      const programs = response.json();
      return programs.map((program) => new Program(
        program.url,
        program.id,
        program.status,
        program.name,
        program.description,
        program.start_date,
        program.end_date,
        program.create_date,
        program.edit_date,
        program.organization,
        []
      	));
    })
    .catch(this.handleError);
  }



  //Log errors on the console
  private handleError (error: Response | any) {
	  console.error('ProgramService::handleError', error);
	  return Observable.throw(error);
	}
}
