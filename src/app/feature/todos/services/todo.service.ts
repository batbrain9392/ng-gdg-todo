import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private totalTodos = new BehaviorSubject<number>(0);
  totalTodos$ = this.totalTodos.asObservable();

  constructor() {}

  loadTodos() {
    return of(this.todos);
  }

  upsertTodo(todo: Todo) {
    const index = this.todos.findIndex(({ id }) => id === todo.id);
    if (index > -1) {
      this.todos[index] = todo;
    } else {
      this.todos = [...this.todos, todo];
    }
    return of(todo);
  }

  deleteTodo(todoId: string) {
    const index = this.todos.findIndex(({ id }) => id === todoId);
    if (index > -1) {
      this.todos = this.todos.splice(index, 1);
      return of(true);
    }
    throwError('todo does not exist');
  }

  clearTodos() {
    this.todos = [];
    return of(true);
  }

  updateTotalTodos(count: number) {
    this.totalTodos.next(count);
  }
}
