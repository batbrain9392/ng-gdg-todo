import { Injectable } from '@angular/core';
import { timer, iif, of, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private delay = 2000;
  private users: User[] = [];

  constructor() {}

  signup(user: User) {
    return timer(this.delay).pipe(
      switchMap(() =>
        iif(
          () => this.users.every(obj => obj.username !== user.username),
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
          () => this.users.some(obj => obj.username === user.username),
          of(user),
          throwError('user does not exist')
        )
      )
    );
  }
}
