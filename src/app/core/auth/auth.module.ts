import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthRoutingModule } from './auth-routing.module';

import { pages } from './pages';
import { effects } from './store/effects';
import * as fromAuth from './store/reducers/auth.reducer';

@NgModule({
  declarations: [...pages],
  imports: [
    CommonModule,
    AuthRoutingModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([...effects])
  ]
})
export class AuthModule {}