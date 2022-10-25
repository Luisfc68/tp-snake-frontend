import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { StorageService } from './services/storage/storage.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
  providers: [StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
