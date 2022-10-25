import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private storageService:StorageService,
    private router:Router
  ) {}

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean|Promise<boolean> {
    if (!this.storageService.getTokensFromStorage()) {
      return this.router.navigateByUrl('/auth');
    } else {
      return true;
    }
  }

}
