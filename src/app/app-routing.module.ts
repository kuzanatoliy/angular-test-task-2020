import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';

import { ProfileComponent } from './profile/pages/profile/profile.component';

import { AuthGuard, AuthLoginGuard } from './core/guards';

export const homeRoute: Route = { path: '', redirectTo: 'profile', pathMatch: 'full' };
export const profileRoute: Route = { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ] };
export const loginRoute: Route = { path: 'login', component: LoginComponent, canActivate: [ AuthLoginGuard ] };

const routes: Routes = [ homeRoute, profileRoute, loginRoute ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
