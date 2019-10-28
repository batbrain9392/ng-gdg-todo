import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { Todo } from '../../store/models/todo.model';
import * as fromStore from '../../store/reducers/todo.reducer';
import * as fromSelectors from '../../store/selectors/todo.selectors';
import * as fromActions from '../../store/actions/todo.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(
    private store: Store<fromStore.State>,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.store.dispatch(fromActions.loadTodos());
    this.todos$ = this.store.select(fromSelectors.selectAllTodos);
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
    this.store.dispatch(fromActions.deleteTodo({ todoId }));
  }

  onClear() {
    this.store.dispatch(fromActions.clearTodos());
  }
}
