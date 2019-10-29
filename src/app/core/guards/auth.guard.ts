import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromAuth from '../auth/store/reducers/auth.reducer';
import * as authSelectors from '../auth/store/selectors/auth.selectors';

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

  constructor(private store: Store<fromAuth.State>) {}

  private isNotAuthenticated() {
    return this.store.select(authSelectors.selectIsLoggedIn).pipe(
      take(1),
      map(isLoggedIn => !isLoggedIn)
    );
  }
}
