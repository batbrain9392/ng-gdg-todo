import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

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

  constructor() {}

  private isNotAuthenticated() {
    return true;
    // return this.store.select(authSelectors.selectIsLoggedIn).pipe(
    //   take(1),
    //   map(isLoggedIn => !isLoggedIn)
    // );
  }
}
