import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';

import { ProfileComponent } from './profile/pages/profile/profile.component';

export const homeRoute: Route = { path: '', redirectTo: 'profile', pathMatch: 'full' };
export const profileRoute: Route = { path: 'profile', component: ProfileComponent };
export const loginRoute: Route = { path: 'login', component: LoginComponent };

const routes: Routes = [ homeRoute, profileRoute, loginRoute ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
