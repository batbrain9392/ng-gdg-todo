import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import * as authActions from '../actions/auth.actions';

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
        tap(() =>
          this.router.navigateByUrl(
            this.route.snapshot.queryParams.returnUrl || '/todos'
          )
        )
      ),
    { dispatch: false }
  );

  authErrors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signupError, authActions.signinError),
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
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}
}
