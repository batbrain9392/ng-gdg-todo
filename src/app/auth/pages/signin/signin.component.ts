import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store/reducers/auth.reducer';
import * as fromActions from '../../store/actions/auth.actions';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit {
  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {}

  onSubmit() {
    this.store.dispatch(
      fromActions.signin({
        user: { username: 'user1', password: 'pass1' }
      })
    );
  }
}
