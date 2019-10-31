import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { timer, BehaviorSubject, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private delay = 2000;
  private users: User[] = [{ username: 'asd', password: 'asd' }];
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  private signedinUser = new BehaviorSubject<User>(null);
  signedinUser$ = this.signedinUser.asObservable();
  isSignedin$ = this.signedinUser$.pipe(map(user => !!user));

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  signup(user: User) {
    this.isLoading.next(true);
    return timer(this.delay).pipe(
      map(() => {
        const userNotExists = this.users.every(
          ({ username }) => username !== user.username
        );
        if (userNotExists) {
          this.users = [...this.users, user];
          return 'user signed up';
        }
        throw 'user already exists';
      }),
      tap(() => this.snackBar.open('signup successful')),
      tap(() => this.router.navigate(['/signin'])),
      catchError(err => this.errorHandler(err)),
      tap(() => this.isLoading.next(false))
    );
  }

  signin(user: User) {
    this.isLoading.next(true);
    return timer(this.delay).pipe(
      map(() => {
        const userExists = this.users.some(
          ({ username, password }) =>
            username === user.username && password === user.password
        );
        if (userExists) {
          return user;
        }
        throw 'user does not exist';
      }),
      tap(userReceived => this.signedinUser.next(userReceived)),
      tap(() => {
        const returnUrl = this.route.snapshot.queryParams.returnUrl;
        this.router.navigateByUrl(returnUrl || '/todos');
      }),
      catchError(err => this.errorHandler(err)),
      tap(() => this.isLoading.next(false))
    );
  }

  signout() {
    this.isLoading.next(true);
    return timer(this.delay).pipe(
      map(() => 'user signed out'),
      tap(() => this.signedinUser.next(null)),
      tap(() => this.router.navigate(['/signin'])),
      catchError(err => this.errorHandler(err)),
      tap(() => this.isLoading.next(false))
    );
  }

  private errorHandler(err: string) {
    this.snackBar.open(err, 'close', {
      duration: 5000,
      panelClass: 'snackbar-error'
    });
    return of(null);
  }
}
