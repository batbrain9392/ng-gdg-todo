import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Todo } from '../../../../models/todo.model';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditComponent implements OnInit {
  todoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo
  ) {}

  ngOnInit() {
    this.todoForm = this.fb.group({
      name: [null, Validators.required]
    });
    if (this.data) {
      this.name.setValue(this.data.name);
    }
  }

  get name() {
    return this.todoForm.controls.name;
  }

  onSubmit() {
    const todo: Todo = {
      id: this.data ? this.data.id : Date.now().toString(),
      ...this.todoForm.value
    };
    this.dialogRef.close(todo);
  }
}
