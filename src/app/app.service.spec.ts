import { TestBed } from '@angular/core/testing';
import { AppService } from './app.service';
import { AppModule } from './app.module';
import { APP_BASE_HREF } from '@angular/common';

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

  it('should be created', () => {
    const service: AppService = TestBed.get(AppService);
    expect(service).toBeTruthy();
  });
});
