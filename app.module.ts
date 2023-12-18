import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FootballersComponent } from './footballers/footballers.component';
import { FootballerDetailComponent } from './footballer-detail/footballer-detail.component';
import { FootballerSearchComponent } from './footballer-search/footballer-search.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService, { dataEncapsulation: false }
        )
  ],
  declarations: [
    AppComponent,
    MessagesComponent,
    DashboardComponent,
    FootballersComponent,
    FootballerDetailComponent,
    FootballerSearchComponent
  ],
  bootstrap: [AppComponent],

})

export class AppModule { }
