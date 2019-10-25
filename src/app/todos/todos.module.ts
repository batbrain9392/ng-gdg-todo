import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosRoutingModule } from './todos-routing.module';
import { pages } from './pages';

@NgModule({
  declarations: [...pages],
  imports: [
    CommonModule,
    TodosRoutingModule
  ]
})
export class TodosModule { }
