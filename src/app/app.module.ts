import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ProfileComponent } from './profile/pages/profile/profile.component';

import { AuthEffects } from './store/effects/auth.effects';
import { reducer as authReducer } from './store/reducers/auth.reducers';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EffectsModule.forRoot([ AuthEffects ]),
    StoreModule.forRoot({ authInfo: authReducer }),
    HttpClientModule,
    AuthModule,
    SharedModule
  ],
  providers: [/*{
    multi: true,
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
  }*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
