import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from 'src/app/shared/shared.module';
import { TodosRoutingModule } from './todos-routing.module';

import { TodosComponent } from './todos.component';
import { pages } from './pages';
import { effects } from './store/effects';
import * as fromTodo from './store/reducers/todo.reducer';

@NgModule({
  declarations: [TodosComponent, ...pages],
  imports: [
    CommonModule,
    SharedModule,
    TodosRoutingModule,
    StoreModule.forFeature(fromTodo.todoFeatureKey, fromTodo.reducer),
    EffectsModule.forFeature([...effects])
  ]
})
export class TodosModule {}
