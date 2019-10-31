import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../auth/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isNotAuthenticated();
  }

  constructor(private authService: AuthService) {}

  private isNotAuthenticated() {
    return this.authService.isSignedin$.pipe(
      take(1),
      map(isLoggedIn => !isLoggedIn)
    );
  }
}
