import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { AuthService } from '../../core/auth/services';
import { TodoService } from './services';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  totalTodos$: Observable<number>;
  username$: Observable<string>;

  constructor(
    private authService: AuthService,
    private todoService: TodoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.username$ = this.authService.signedinUser$.pipe(
      filter(user => !!user),
      map(user => user.username)
    );
    this.totalTodos$ = this.todoService.totalTodos$;
  }

  onSignout() {
    const sub = this.authService
      .signout()
      .subscribe(() => this.router.navigate(['/signin']));
    this.subs.add(sub);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
