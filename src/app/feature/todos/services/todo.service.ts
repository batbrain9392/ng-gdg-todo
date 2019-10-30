import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../store/models/todo.model';

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
        if (index > -1) {
          this.todos[index] = todo;
          return todo;
        } else {
          this.todos = [...this.todos, todo];
          return todo;
        }
      })
    );
  }

  deleteTodo(todoId: string) {
    return timer(this.delay).pipe(
      map(() => {
        const index = this.todos.findIndex(({ id }) => id === todoId);
        if (index > -1) {
          this.todos = this.todos.splice(index, 1);
          return 'todo deleted';
        }
        throw 'todo does not exist';
      })
    );
  }

  clearTodos() {
    return timer(this.delay).pipe(map(() => (this.todos = [])));
  }
}
