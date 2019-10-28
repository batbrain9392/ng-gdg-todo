import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromStore from '../auth/store/reducers/auth.reducer';
import * as fromSelectors from '../auth/store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(fromSelectors.selectIsLoggedIn).pipe(
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/signin'], {
            queryParams: { returnUrl: state.url }
          });
        }
      })
    );
  }

  constructor(private router: Router, private store: Store<fromStore.State>) {}
}
