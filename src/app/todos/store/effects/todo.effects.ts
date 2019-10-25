import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import * as fromActions from '../actions/todo.actions';

@Injectable()
export class TodoEffects {
  // loadTodos$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromActions.loadTodos),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => fromActions.loadTodosSuccess({ data })),
  //         catchError(error => of(fromActions.loadTodosFailure({ error })))
  //       )
  //     )
  //   )
  // );

  constructor(private actions$: Actions) {}
}
