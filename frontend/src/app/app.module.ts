// Angular libraries
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Third party libraries
import { AuthModule } from '@auth0/auth0-angular';

// Services

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Utilities
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AuthModule.forRoot({
      domain: 'bhayanak.eu.auth0.com',
      clientId: 'JHHzTB41tXs5w7UjqXJIOhOcYSgOgM5N'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
