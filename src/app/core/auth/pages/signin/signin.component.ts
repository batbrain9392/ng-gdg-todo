import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { AuthService } from '../../services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit {
  private subs = new SubSink();
  signinForm: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.signinForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
    this.isLoading$ = this.authService.isLoading$;
  }

  get username() {
    return this.signinForm && this.signinForm.controls.username;
  }

  get password() {
    return this.signinForm && this.signinForm.controls.password;
  }

  onSubmit() {
    this.authService.signin(this.signinForm.value).subscribe();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
