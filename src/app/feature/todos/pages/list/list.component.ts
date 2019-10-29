import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { Todo } from '../../store/models/todo.model';
import * as fromTodo from '../../store/reducers/todo.reducer';
import * as todoSelectors from '../../store/selectors/todo.selectors';
import * as todoActions from '../../store/actions/todo.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(private store: Store<fromTodo.State>, public dialog: MatDialog) {}

  ngOnInit() {
    this.store.dispatch(todoActions.loadTodos());
    this.todos$ = this.store.select(todoSelectors.selectAllTodos);
  }

  onAdd() {
    this.dialog.open(AddEditComponent);
  }

  onEdit(todo: Todo) {
    this.dialog.open(AddEditComponent, {
      data: todo
    });
  }

  onDelete(todoId: string) {
    this.store.dispatch(todoActions.deleteTodo({ todoId }));
  }

  onClear() {
    this.store.dispatch(todoActions.clearTodos());
  }
}
