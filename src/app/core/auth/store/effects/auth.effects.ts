import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { of } from 'rxjs';
import {
  map,
  exhaustMap,
  catchError,
  tap,
  switchMap,
  take
} from 'rxjs/operators';
import { AuthService } from '../../services';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as authActions from '../actions/auth.actions';
import * as fromApp from '../../../../store/index';
import * as routeSelectors from '../../../../store/route.selectors';

@Injectable()
export class AuthEffects {
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signup),
      exhaustMap(({ user }) =>
        this.authService.signup(user).pipe(
          map(() => authActions.signupSuccess()),
          tap(() => this.snackBar.open('signup successful')),
          catchError(err => of(authActions.signupError({ err })))
        )
      )
    )
  );
  signupRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.signupSuccess),
        tap(() => this.router.navigate(['/signin']))
      ),
    { dispatch: false }
  );

  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signin),
      exhaustMap(({ user }) =>
        this.authService.signin(user).pipe(
          map(userReceived =>
            authActions.signinSuccess({ user: userReceived })
          ),
          catchError(err => of(authActions.signinError({ err })))
        )
      )
    )
  );
  signinRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.signinSuccess),
        switchMap(() =>
          this.store.select(routeSelectors.selectReturnUrl).pipe(
            take(1),
            tap(returnUrl => this.router.navigateByUrl(returnUrl || '/todos'))
          )
        )
      ),
    { dispatch: false }
  );

  signout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signout),
      exhaustMap(() =>
        this.authService.signout().pipe(
          map(() => authActions.signoutSuccess()),
          catchError(err => of(authActions.signoutError({ err })))
        )
      )
    )
  );
  signoutRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.signoutSuccess),
        tap(() => this.router.navigateByUrl('/signin'))
      ),
    { dispatch: false }
  );

  authErrors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        authActions.signupError,
        authActions.signinError,
        authActions.signoutError
      ),
      switchMap(({ err }) =>
        this.snackBar
          .open(err, 'close', { duration: 5000, panelClass: 'snackbar-error' })
          .afterDismissed()
          .pipe(map(() => authActions.authErrorClear()))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.State>,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
}
