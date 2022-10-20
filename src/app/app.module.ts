import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsersService} from "../services/users.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClient,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
