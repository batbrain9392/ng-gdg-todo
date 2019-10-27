import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { pages } from './pages';
import { effects } from './store/effects';
import * as fromAuth from './store/reducers/auth.reducer';

@NgModule({
  declarations: [...pages],
  imports: [
    SharedModule,
    AuthRoutingModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([...effects])
  ]
})
export class AuthModule {}
