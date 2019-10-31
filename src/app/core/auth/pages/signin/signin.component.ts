import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SubSink } from 'subsink';
import { AuthService } from '../../services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  private subs = new SubSink();
  signinForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.signinForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  get username() {
    return this.signinForm && this.signinForm.controls.username;
  }

  get password() {
    return this.signinForm && this.signinForm.controls.password;
  }

  onSubmit() {
    const sub = this.authService.signin(this.signinForm.value).subscribe(
      () => {
        const returnUrl = this.route.snapshot.queryParams.returnUrl;
        this.router.navigateByUrl(returnUrl || '/todos');
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
