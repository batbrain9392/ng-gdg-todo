import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeatureGuard implements CanLoad, CanActivate {
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticated(
      `/${segments.map(({ path }) => path).join('/')}`
    );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isAuthenticated(state.url);
  }

  constructor(private router: Router) {}

  private isAuthenticated(currentUrl: string) {
    return true;
    // return this.store.select(authSelectors.selectIsLoggedIn).pipe(
    //   take(1),
    //   tap(isLoggedIn => {
    //     if (!isLoggedIn) {
    //       this.router.navigate(['/signin'], {
    //         queryParams: { returnUrl: currentUrl }
    //       });
    //     }
    //   })
    // );
  }
}
