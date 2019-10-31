import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [{ username: 'asd', password: 'asd' }];
  private signedinUser = new BehaviorSubject<User>(null);
  signedinUser$ = this.signedinUser.asObservable();
  isSignedin$ = this.signedinUser$.pipe(map(user => !!user));

  constructor() {}

  signup(user: User) {
    const userNotExists = this.users.every(
      ({ username }) => username !== user.username
    );
    if (userNotExists) {
      this.users = [...this.users, user];
      return of('user signed up');
    }
    return throwError('user already exists');
  }

  signin(user: User) {
    const userExists = this.users.some(
      ({ username, password }) =>
        username === user.username && password === user.password
    );
    if (userExists) {
      this.signedinUser.next(user);
      return of(user);
    }
    return throwError('user does not exist');
  }

  signout() {
    this.signedinUser.next(null);
    return of('user signed out');
  }
}
