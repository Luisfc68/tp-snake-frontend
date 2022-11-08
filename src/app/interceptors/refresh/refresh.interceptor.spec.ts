import { TestBed } from '@angular/core/testing';
import { RefreshInterceptor } from './refresh.interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('RefreshInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RefreshInterceptor,
      JwtHelperService,
      { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    ],
    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const interceptor: RefreshInterceptor = TestBed.inject(RefreshInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
