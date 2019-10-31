import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { timer, BehaviorSubject, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private delay = 2000;
  private todos: Todo[] = [];
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  private totalTodos = new BehaviorSubject<number>(0);
  totalTodos$ = this.totalTodos.asObservable();

  constructor(private snackBar: MatSnackBar) {}

  loadTodos() {
    this.isLoading.next(true);
    return timer(this.delay).pipe(
      map(() => this.todos),
      catchError(err => this.errorHandler(err)),
      tap(() => this.isLoading.next(false))
    );
  }

  upsertTodo(todo: Todo) {
    this.isLoading.next(true);
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
      }),
      catchError(err => this.errorHandler(err)),
      tap(() => this.isLoading.next(false))
    );
  }

  deleteTodo(todoId: string) {
    this.isLoading.next(true);
    return timer(this.delay).pipe(
      map(() => {
        const index = this.todos.findIndex(({ id }) => id === todoId);
        if (index > -1) {
          this.todos = this.todos.splice(index, 1);
          return true;
        }
        throw 'todo does not exist';
      }),
      catchError(err => this.errorHandler(err)),
      tap(() => this.isLoading.next(false))
    );
  }

  clearTodos() {
    this.isLoading.next(true);
    return timer(this.delay).pipe(
      map(() => {
        this.todos = [];
        return true;
      }),
      catchError(err => this.errorHandler(err)),
      tap(() => this.isLoading.next(false))
    );
  }

  updateTotalTodos(count: number) {
    this.totalTodos.next(count);
  }

  private errorHandler(err: string) {
    this.snackBar.open(err, 'close', {
      duration: 5000,
      panelClass: 'snackbar-error'
    });
    return of(null);
  }
}
