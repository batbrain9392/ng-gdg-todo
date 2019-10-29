import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromTodo from './store/reducers/todo.reducer';
import * as todoSelectors from './store/selectors/todo.selectors';
import * as authSelectors from '../../core/auth/store/selectors/auth.selectors';
import * as authActions from '../../core/auth/store/actions/auth.actions';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit {
  totalTodos: Observable<number>;
  isLoading: Observable<boolean>;
  username: Observable<string>;

  constructor(private store: Store<fromTodo.State>) {}

  ngOnInit() {
    this.totalTodos = this.store.select(todoSelectors.selectTotalTodos);
    this.isLoading = this.store.select(todoSelectors.selectIsLoading);
    this.username = this.store.select(authSelectors.selectUser).pipe(
      filter(user => !!user),
      map(user => user.username)
    );
  }

  onSignout() {
    this.store.dispatch(authActions.signout());
  }
}
