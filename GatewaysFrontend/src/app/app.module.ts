import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { GatewaysListComponent } from './components/gateways-list/gateways-list.component';
import { GatewaysDetailsComponent } from './components/gateways-details/gateways-details.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { GatewaysService } from './services/gateways.service';

@NgModule({
  declarations: [
    AppComponent,
    GatewaysListComponent,
    GatewaysDetailsComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    GatewaysService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
