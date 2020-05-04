import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatListModule} from '@angular/material/list';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';
import {HeroSearchComponent} from './Components/hero-search/hero-search.component';
import {AppRoutingModule} from './app-routing.module';
import {HeroesComponent} from './Components/heroes/heroes.component';
import {HeroDetailComponent} from './Components/hero-detail/hero-detail.component';
import {MessagesComponent} from './Components/messages/messages.component';
import {DashboardComponent} from './Components/dashboard/dashboard.component';
import {ConfirmationModalComponent} from './Components/confirmation-modal/confirmation-modal.component';
import {HeroDetailGuard} from './Guards/hero-detail-guard';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    ConfirmationModalComponent
  ],
  entryComponents: [ConfirmationModalComponent],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSliderModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatListModule,
    FlexLayoutModule
  ],
  providers: [HeroDetailGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
