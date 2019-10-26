import { Injectable } from '@angular/core';
import { timer, iif, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private delay = 2000;
  private todos: Todo[] = [];

  constructor() {}

  loadTodos() {
    return timer(this.delay).pipe(map(() => this.todos));
  }

  upsertTodo(todo: Todo) {
    return timer(this.delay).pipe(
      map(() => {
        const index = this.todos.findIndex(({ id }) => id === todo.id);
        if (index === -1) {
          this.todos = [...this.todos, todo];
          return 'inserted';
        } else {
          this.todos[index] = todo;
          return 'updated';
        }
      })
    );
  }

  deleteTodo(todoId: string) {
    return timer(this.delay).pipe(
      switchMap(() =>
        iif(
          () => this.todos.some(obj => obj.id === todoId),
          of('deleted').pipe(
            tap(
              () => (this.todos = this.todos.filter(({ id }) => id !== todoId))
            )
          ),
          throwError('todo does not exist')
        )
      )
    );
  }
}
