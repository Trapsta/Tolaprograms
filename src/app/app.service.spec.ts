import { TestBed } from '@angular/core/testing';
import { AppService } from './app.service';
import { AppModule } from './app.module';
import { APP_BASE_HREF } from '@angular/common';

let testService: AppService;
let mockProgram: Program;
let responsePropertyNames, expectedPropertyNames;

describe('AppService', () => {
  beforeEach(() => TestBed.configureTestingModule({
  	imports: [
  		AppModule
      ],
      declarations: [
      ],
      providers: [
      	{provide: APP_BASE_HREF, useValue: '/'}
      ]
  }));

  beforeEach(() => {
    testService= TestBed.get(AppService);
    mockProgram = { 
      activities: []
      create_date: "2018-10-16T09:44:06+02:00"
      description: ""
      edit_date: "2018-11-03T15:47:41.714254+01:00"
      end_date: null
      id: 323
      name: "12"
      organization: "https://dev.toladata.io/api/organization/1/"
      start_date: null
      status: ""
      url: "https://dev.toladata.io/api/workflowlevel1/323/"
    };
  });

  it('should be created', () => {
    const service: AppService = TestBed.get(AppService);
    expect(service).toBeTruthy();
  });

  it('#AppService should have method getPrograms that returns observable',async() => {
    
  testService.getPrograms().pipe(value => {
     
  });

});


});
