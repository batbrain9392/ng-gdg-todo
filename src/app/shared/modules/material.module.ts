import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatIconModule,
  MatBadgeModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialModule {}
