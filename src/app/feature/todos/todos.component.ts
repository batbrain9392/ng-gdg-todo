import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AuthService } from '../../core/auth/services';
import { TodoService } from './services';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit {
  totalTodos$: Observable<number>;
  isLoading$: Observable<boolean>;
  username$: Observable<string>;

  constructor(
    private authService: AuthService,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.username$ = this.authService.signedinUser$.pipe(
      filter(user => !!user),
      map(user => user.username)
    );
    this.isLoading$ = this.todoService.isLoading$;
    this.totalTodos$ = this.todoService.totalTodos$;
  }

  onSignout() {
    this.authService.signout().subscribe();
  }
}
