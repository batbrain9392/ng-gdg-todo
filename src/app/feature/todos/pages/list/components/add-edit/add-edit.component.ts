import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../store/reducers/todo.reducer';
import * as fromActions from '../../../../store/actions/todo.actions';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditComponent implements OnInit {
  todoForm: FormGroup;

  constructor(private store: Store<fromStore.State>, private fb: FormBuilder) {}

  ngOnInit() {
    this.todoForm = this.fb.group({
      name: [null, Validators.required]
    });
  }

  get name() {
    return this.todoForm.controls.name;
  }

  onSubmit() {
    this.store.dispatch(fromActions.upsertTodo({ todo: this.todoForm.value }));
  }
}
