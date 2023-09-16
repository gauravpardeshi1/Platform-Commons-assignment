import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './cart/cart.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CartComponent,
    CatalogueComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotifierModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
