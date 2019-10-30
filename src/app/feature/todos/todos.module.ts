import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { TodosRoutingModule } from './todos-routing.module';

import { TodosComponent } from './todos.component';
import { pages, entryComponents } from './pages';

@NgModule({
  declarations: [TodosComponent, ...pages],
  entryComponents: [...entryComponents],
  imports: [SharedModule, TodosRoutingModule]
})
export class TodosModule {}
