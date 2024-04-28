import {CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { register } from 'swiper/element';
import { httpInterceptorProviders } from './service/interceptor';
import { AuthGuard } from './service/auth-guard.service';
import { DatePipe } from '@angular/common';

//import { MoverPakersStepsComponent } from './pages/mover-pakers-steps/mover-pakers-steps.component';

// register Swiper custom elements
register();




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    SharedModule
  ],
  providers: [httpInterceptorProviders,AuthGuard,DatePipe],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
