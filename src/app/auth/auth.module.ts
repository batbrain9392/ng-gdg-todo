import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { pages } from './pages';

@NgModule({
  declarations: [...pages],
  imports: [CommonModule, AuthRoutingModule]
})
export class AuthModule {}
