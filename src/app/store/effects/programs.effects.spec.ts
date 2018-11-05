import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ProgramsEffects } from './programs.effects';
import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '@angular/common';

describe('ProgramsEffects', () => {
  let actions$: Observable<any>;
  let effects: ProgramsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        ProgramsEffects,
        provideMockActions(() => actions$),
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    });

    effects = TestBed.get(ProgramsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
