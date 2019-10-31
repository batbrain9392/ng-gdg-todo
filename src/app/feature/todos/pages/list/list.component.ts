import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { mergeMap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  todos: Todo[] = [];

  constructor(private todoService: TodoService, private dialog: MatDialog) {}

  ngOnInit() {
    const sub = this.todoService.loadTodos().subscribe(todos => {
      if (todos) {
        this.todos = todos;
        this.updateTotalTodos();
      }
    });
    this.subs.add(sub);
  }

  onAdd() {
    const sub = this.dialog
      .open(AddEditComponent)
      .afterClosed()
      .pipe(mergeMap((todo: Todo) => this.todoService.upsertTodo(todo)))
      .subscribe((todoReceived: Todo) => {
        if (todoReceived) {
          this.todos = [...this.todos, todoReceived];
          this.updateTotalTodos();
        }
      });
    this.subs.add(sub);
  }

  onEdit(todo: Todo, index: number) {
    const sub = this.dialog
      .open(AddEditComponent, {
        data: todo
      })
      .afterClosed()
      .pipe(mergeMap((todo: Todo) => this.todoService.upsertTodo(todo)))
      .subscribe((todoReceived: Todo) => {
        if (todoReceived) {
          this.todos[index] = todoReceived;
          this.updateTotalTodos();
        }
      });
    this.subs.add(sub);
  }

  onDelete(todoId: string, index: number) {
    const sub = this.todoService.deleteTodo(todoId).subscribe(isSuccess => {
      if (isSuccess) {
        this.todos = this.todos.splice(index, 1);
        this.updateTotalTodos();
      }
    });
    this.subs.add(sub);
  }

  onClear() {
    const sub = this.todoService.clearTodos().subscribe(isSuccess => {
      if (isSuccess) {
        this.todos = [];
        this.updateTotalTodos();
      }
    });
    this.subs.add(sub);
  }

  private updateTotalTodos() {
    this.todoService.updateTotalTodos(this.todos.length);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
