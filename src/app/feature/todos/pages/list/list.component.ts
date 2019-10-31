import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { mergeMap } from 'rxjs/operators';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService, private dialog: MatDialog) {}

  ngOnInit() {
    this.todoService.loadTodos().subscribe(todos => {
      if (todos) {
        this.todos = todos;
        this.updateTotalTodos();
      }
    });
  }

  onAdd() {
    this.dialog
      .open(AddEditComponent)
      .afterClosed()
      .pipe(mergeMap((todo: Todo) => this.todoService.upsertTodo(todo)))
      .subscribe((todoReceived: Todo) => {
        if (todoReceived) {
          this.todos = [...this.todos, todoReceived];
          this.updateTotalTodos();
        }
      });
  }

  onEdit(todo: Todo, index: number) {
    this.dialog
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
  }

  onDelete(todoId: string, index: number) {
    this.todoService.deleteTodo(todoId).subscribe(isSuccess => {
      if (isSuccess) {
        this.todos = this.todos.splice(index, 1);
        this.updateTotalTodos();
      }
    });
  }

  onClear() {
    this.todoService.clearTodos().subscribe(isSuccess => {
      if (isSuccess) {
        this.todos = [];
        this.updateTotalTodos();
      }
    });
  }

  private updateTotalTodos() {
    this.todoService.updateTotalTodos(this.todos.length);
  }
}
