import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

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

  constructor() {}

  ngOnInit() {
    // this.totalTodos = this.store.select(todoSelectors.selectTotalTodos);
    // this.isLoading = this.store.select(todoSelectors.selectIsLoading);
    // this.username = this.store.select(authSelectors.selectUser).pipe(
    //   filter(user => !!user),
    //   map(user => user.username)
    // );
  }

  onSignout() {
    // this.store.dispatch(authActions.signout());
  }
}
