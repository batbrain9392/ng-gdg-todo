import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TodoService } from '../services/todo.service';
import * as fromActions from '../actions/todo.actions';

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadTodos),
      concatMap(() =>
        this.todoService.loadTodos().pipe(
          map(todos => fromActions.loadTodosSuccess({ todos })),
          catchError(err => of(fromActions.loadTodosError({ err })))
        )
      )
    )
  );

  upsertTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.upsertTodo),
      concatMap(({ todo }) =>
        this.todoService.upsertTodo(todo).pipe(
          map(todoObj => fromActions.upsertTodoSuccess({ todo: todoObj })),
          catchError(err => of(fromActions.upsertTodoError({ err })))
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deleteTodo),
      concatMap(({ todoId }) =>
        this.todoService.deleteTodo(todoId).pipe(
          map(() => fromActions.deleteTodoSuccess({ todoId })),
          catchError(err => of(fromActions.deleteTodoError({ err })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
