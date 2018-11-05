import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ActivitiesEffects } from './activities.effects';

import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '@angular/common';

describe('ActivitiesEffects', () => {
  let actions$: Observable<any>;
  let effects: ActivitiesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        ActivitiesEffects,
        provideMockActions(() => actions$),
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    });

    effects = TestBed.get(ActivitiesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
