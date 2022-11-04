import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, from, mergeMap, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from "../../services/auth/auth.service";
import { Router } from '@angular/router';

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {

  constructor(
    private jwtHelper:JwtHelperService,
    private authService:AuthService,
    private router:Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token:string|null = request.headers.get('Authorization');

    if (token && this.jwtHelper.isTokenExpired(token)) {
      return this.doRefresh(request, next);
    } else {
      return next.handle(request);
    }
  }

  private doRefresh(request:HttpRequest<unknown>, next: HttpHandler):Observable<HttpEvent<unknown>> {
    return from(this.authService.refresh())
      .pipe(
        mergeMap(newLoginResponse => {
          request.headers.set('Authorization', newLoginResponse.accessToken);
          return next.handle(request);
        }),
        catchError(() => {
          this.router.navigateByUrl('/auth');
          return next.handle(request);
        })
      );
  }
}
