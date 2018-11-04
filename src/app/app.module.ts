import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ProgramsEffects } from './store/effects/programs.effects';
import { ActivitiesEffects } from './store/effects/activities.effects';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ProgramsComponent,
    ActivitiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    NgbModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([ProgramsEffects, ActivitiesEffects])
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
