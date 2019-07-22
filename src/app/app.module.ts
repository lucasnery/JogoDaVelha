import {DataService} from './data.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeroSelectComponent} from './modal/hero-select/hero-select.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroSelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  entryComponents: [
    HeroSelectComponent
  ],
  providers: [
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
