import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  isLoading: Observable<boolean>;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.signinForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
    // this.isLoading = this.store.select(authSelectors.selectIsLoading);
  }

  get username() {
    return this.signinForm && this.signinForm.controls.username;
  }

  get password() {
    return this.signinForm && this.signinForm.controls.password;
  }

  onSubmit() {
    // this.store.dispatch(
    //   authActions.signin({
    //     user: this.signinForm.value
    //   })
    // );
  }
}
