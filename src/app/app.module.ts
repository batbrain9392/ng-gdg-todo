import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { JokesComponent } from './jokes/jokes.component';
import { AnotherJokeComponent } from './another-joke/another-joke.component';

@NgModule({
  declarations: [AppComponent, JokesComponent, AnotherJokeComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
