import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { modules } from './modules';

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules]
})
export class SharedModule {}
