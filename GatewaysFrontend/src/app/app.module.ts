import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { GatewaysListComponent } from './components/gateways-list/gateways-list.component';
import { GatewaysDetailsComponent } from './components/gateways-details/gateways-details.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AlertComponent } from './shared/alert/alert.component';

import { GatewaysService } from './services/gateways.service';
import { SearchService } from './services/search.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    GatewaysListComponent,
    GatewaysDetailsComponent,
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: [
    GatewaysService,
    SearchService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
