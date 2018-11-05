import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsComponent } from './programs.component';
import { ActivitiesComponent } from '../activities/activities.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../../store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ProgramsEffects } from '../../store/effects/programs.effects';
import { ActivitiesEffects } from '../../store/effects/activities.effects';

describe('ProgramsComponent', () => {
  let component: ProgramsComponent;
  let fixture: ComponentFixture<ProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule,
        ReactiveFormsModule,
        HttpModule,
        NgbModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([ProgramsEffects, ActivitiesEffects])
      ],
      declarations: [ ProgramsComponent, ActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
