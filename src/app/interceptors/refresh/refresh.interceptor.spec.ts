import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { RefreshInterceptor } from './refresh.interceptor';

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
