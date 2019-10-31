import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SubSink } from 'subsink';
import { AuthService } from '../../services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  private subs = new SubSink();
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  get username() {
    return this.signupForm && this.signupForm.controls.username;
  }

  get password() {
    return this.signupForm && this.signupForm.controls.password;
  }

  onSubmit() {
    const sub = this.authService.signup(this.signupForm.value).subscribe(
      () => {
        this.snackBar.open('signup successful');
        this.router.navigate(['/signin']);
      },
      (err: string) =>
        this.snackBar.open(err, 'close', {
          duration: 5000,
          panelClass: 'snackbar-error'
        })
    );
    this.subs.add(sub);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
