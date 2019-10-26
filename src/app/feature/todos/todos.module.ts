import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TodosRoutingModule } from './todos-routing.module';

import { pages } from './pages';
import * as fromTodo from './store/reducers/todo.reducer';
import { TodoEffects } from './store/effects/todo.effects';

@NgModule({
  declarations: [...pages],
  imports: [
    CommonModule,
    TodosRoutingModule,
    StoreModule.forFeature(fromTodo.todosFeatureKey, fromTodo.reducer),
    EffectsModule.forFeature([TodoEffects])
  ]
})
export class TodosModule {}
