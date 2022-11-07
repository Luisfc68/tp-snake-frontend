import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { StorageService } from './services/storage/storage.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RefreshInterceptor } from './interceptors/refresh/refresh.interceptor';
import { config } from './shared/constants/socketio.config';
import { SocketIoModule } from 'ngx-socket-io';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: (storageService:StorageService) => {
          return {
            tokenGetter: () => storageService.getAccessToken(),
            authScheme: 'Bearer ',
            allowedDomains: environment.allowedDomains
          }
        },
        deps: [StorageService]
      }
    })
  ],
  providers: [
    StorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
