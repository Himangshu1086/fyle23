import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { RouterModule } from '@angular/router';

import { GithubProfileComponent } from './components/github-profile/github-profile.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    GithubProfileComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'', component:HomeComponent},
      {path: 'profile', component: GithubProfileComponent}
    ]),
  ],
  providers: [HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }


