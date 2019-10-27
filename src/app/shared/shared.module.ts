import { NgModule } from '@angular/core';

import { modules } from './modules';

@NgModule({
  exports: [...modules]
})
export class SharedModule {}
