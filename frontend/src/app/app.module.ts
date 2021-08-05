// Angular libraries
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Third party libraries
import { AuthModule } from '@auth0/auth0-angular';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// Services

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Utilities
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';

// Configuration

// Use production backend url
const config: SocketIoConfig = { url: environment.backendURL, options: {} };

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
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AuthModule.forRoot({
      domain: 'bhayanak.eu.auth0.com',
      clientId: 'JHHzTB41tXs5w7UjqXJIOhOcYSgOgM5N'
    }),
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
