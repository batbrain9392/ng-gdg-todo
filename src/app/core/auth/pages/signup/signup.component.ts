import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../store/reducers/auth.reducer';
import * as authActions from '../../store/actions/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private store: Store<fromAuth.State>, private fb: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  get username() {
    return this.signupForm.controls.username;
  }

  get password() {
    return this.signupForm.controls.password;
  }

  onSubmit() {
    this.store.dispatch(
      authActions.signup({
        user: this.signupForm.value
      })
    );
  }
}
