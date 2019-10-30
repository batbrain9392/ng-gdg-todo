import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../store/reducers/auth.reducer';
import * as authActions from '../../store/actions/auth.actions';
import * as authSelectors from '../../store/selectors/auth.selectors';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isLoading: Observable<boolean>;

  constructor(private store: Store<fromAuth.State>, private fb: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
    this.isLoading = this.store.select(authSelectors.selectIsLoading);
  }

  get username() {
    return this.signupForm && this.signupForm.controls.username;
  }

  get password() {
    return this.signupForm && this.signupForm.controls.password;
  }

  onSubmit() {
    this.store.dispatch(
      authActions.signup({
        user: this.signupForm.value
      })
    );
  }
}
