import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TodosRoutingModule } from './todos-routing.module';

import { pages } from './pages';
import { effects } from './store/effects';
import * as fromTodo from './store/reducers/todo.reducer';

@NgModule({
  declarations: [...pages],
  imports: [
    CommonModule,
    TodosRoutingModule,
    StoreModule.forFeature(fromTodo.todoFeatureKey, fromTodo.reducer),
    EffectsModule.forFeature([...effects])
  ]
})
export class TodosModule {}
