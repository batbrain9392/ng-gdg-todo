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
        if (!todo.id) {
          todo = { id: Date.now().toString(), ...todo };
          this.todos = [...this.todos, todo];
          return todo;
        } else {
          const index = this.todos.findIndex(({ id }) => id === todo.id);
          if (index > -1) {
            this.todos[index] = todo;
            return todo;
          } else {
            throw 'todo does not exist';
          }
        }
      })
    );
  }

  deleteTodo(todoId: string) {
    return timer(this.delay).pipe(
      map(() => {
        const index = this.todos.findIndex(({ id }) => id !== todoId);
        if (index > -1) {
          this.todos = this.todos.splice(index);
        } else {
          throw 'todo does not exist';
        }
      })
    );
  }
}
