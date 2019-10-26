import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../../store/models/todo.model';
import * as fromStore from '../../store/reducers/todo.reducer';
import * as fromSelectors from '../../store/selectors/todo.selectors';
import * as fromActions from '../../store/actions/todo.actions';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.store.dispatch(fromActions.loadTodos());
    this.todos$ = this.store.select(fromSelectors.getAllTodos);
  }

  onSubmit() {
    this.store.dispatch(
      fromActions.upsertTodo({ todo: { id: '1', name: 'lecture' } })
    );
  }
}
