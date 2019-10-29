import { Injectable } from '@angular/core';
import { timer, iif, of, throwError } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private delay = 2000;
  private users: User[] = [{ username: 'asd', password: 'asd' }];

  constructor() {}

  signup(user: User) {
    return timer(this.delay).pipe(
      switchMap(() =>
        iif(
          () => this.users.every(({ username }) => username !== user.username),
          of('user signed up').pipe(
            tap(() => (this.users = [...this.users, user]))
          ),
          throwError('user already exists')
        )
      )
    );
  }

  signin(user: User) {
    return timer(this.delay).pipe(
      switchMap(() =>
        iif(
          () =>
            this.users.some(
              ({ username, password }) =>
                username === user.username && password === user.password
            ),
          of(user),
          throwError('user does not exist')
        )
      )
    );
  }

  signout() {
    return timer(this.delay).pipe(map(() => 'user signed out'));
  }
}
