import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService ,
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
      ],
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
