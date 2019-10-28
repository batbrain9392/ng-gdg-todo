import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTodo from './store/reducers/todo.reducer';
import * as todoSelectors from './store/selectors/todo.selectors';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit {
  totalTodos: Observable<number>;

  constructor(private store: Store<fromTodo.State>) {}

  ngOnInit() {
    this.totalTodos = this.store.select(todoSelectors.selectTotalTodos);
  }
}
