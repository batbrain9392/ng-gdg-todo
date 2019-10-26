import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store/reducers/auth.reducer';
import * as fromActions from '../../store/actions/auth.actions';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {}

  onSubmit() {
    this.store.dispatch(
      fromActions.signup({
        user: { username: 'user1', password: 'pass1' }
      })
    );
  }
}
