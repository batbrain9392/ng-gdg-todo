import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from '../services/todo.service';
import * as todoActions from '../actions/todo.actions';

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.loadTodos),
      concatMap(() =>
        this.todoService.loadTodos().pipe(
          map(todos => todoActions.loadTodosSuccess({ todos })),
          catchError(err => of(todoActions.loadTodosError({ err })))
        )
      )
    )
  );

  upsertTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.upsertTodo),
      concatMap(({ todo }) =>
        this.todoService.upsertTodo(todo).pipe(
          map(todoObj => todoActions.upsertTodoSuccess({ todo: todoObj })),
          catchError(err => of(todoActions.upsertTodoError({ err })))
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.deleteTodo),
      concatMap(({ todoId }) =>
        this.todoService.deleteTodo(todoId).pipe(
          map(() => todoActions.deleteTodoSuccess({ todoId })),
          catchError(err => of(todoActions.deleteTodoError({ err })))
        )
      )
    )
  );

  clearTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.clearTodos),
      concatMap(() =>
        this.todoService.clearTodos().pipe(
          map(() => todoActions.clearTodosSuccess()),
          catchError(err => of(todoActions.clearTodosError({ err })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
