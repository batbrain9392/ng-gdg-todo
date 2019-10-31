import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
    this.isLoading$ = this.authService.isLoading$;
  }

  get username() {
    return this.signupForm && this.signupForm.controls.username;
  }

  get password() {
    return this.signupForm && this.signupForm.controls.password;
  }

  onSubmit() {
    this.authService.signup(this.signupForm.value).subscribe();
  }
}
