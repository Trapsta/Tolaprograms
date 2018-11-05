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


  // API: GET /workflowlevel1
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



  // API: GET /workflowlevel2
  public getActivities(): Observable<Activity[]> {
    return this.http.get(API_URL + '/workflowlevel2/', { headers: config })
    .map(response => {
      const programs = response.json();
      return programs.map((activity) => new Activity(
        activity.id,
        activity.url,
        activity.name,
        activity.workflowlevel1,
        activity.expected_start_date,
        activity.expected_end_date,
        activity.actual_start_date,
        activity.actual_end_date,
        activity.description,
        activity.short_name,
        activity.create_date,
        activity.edit_date,
        activity.status,
        activity.progress
        ));
    })
    .catch(this.handleError);
  }

  //API: POST /workflowlevel2
  addActivity(activity) {    
    const body = {
      name: activity.name,
      workflowlevel1: activity.workflowlevel1,
      expected_start_date: activity.expected_start_date,
      expected_end_date: activity.expected_end_date
    }
    return this.http.post(API_URL + '/workflowlevel2/', body, { headers: config })
      .map((res) => {
        console.log(res);
        const activity = res.json();
        return new Activity(
          activity.id,
          activity.url,
          activity.name,
          activity.workflowlevel1,
          activity.expected_start_date,
          activity.expected_end_date,
          activity.actual_start_date,
          activity.actual_end_date,
          activity.description,
          activity.short_name,
          activity.create_date,
          activity.edit_date,
          activity.status,
          activity.progress
        )
      }).catch(this.handleError);
  }


  //API: DELETE /workflowlevel2/id
  deleteActivity(activityId) {
    return this.http.delete(API_URL + '/workflowlevel2/' + activityId, { headers: config })
  }



  //Return error to client
  private handleError (error: Response | any) {
	  console.error('AppService::handleError', error);
	  return Observable.throw(error);
	}
}
