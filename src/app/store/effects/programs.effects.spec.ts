import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ProgramsEffects } from './programs.effects';

describe('ProgramsEffects', () => {
  let actions$: Observable<any>;
  let effects: ProgramsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProgramsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ProgramsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
