import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import * as fromActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.signup),
      exhaustMap(({ user }) =>
        this.authService.signup(user).pipe(
          map(() => fromActions.signupSuccess()),
          tap(() => this.snackBar.open('signup successful')),
          catchError(err => of(fromActions.signupError({ err })))
        )
      )
    )
  );

  signupRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.signupSuccess),
        tap(() => this.router.navigate(['/signin']))
      ),
    { dispatch: false }
  );

  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.signin),
      exhaustMap(({ user }) =>
        this.authService.signin(user).pipe(
          map(userReceived =>
            fromActions.signinSuccess({ user: userReceived })
          ),
          catchError(err => of(fromActions.signinError({ err })))
        )
      )
    )
  );

  signinRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.signinSuccess),
        tap(() => this.router.navigate(['/todos']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
}
