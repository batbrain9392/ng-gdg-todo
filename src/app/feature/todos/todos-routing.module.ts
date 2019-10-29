import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodosComponent } from './todos.component';
import { ListComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
    children: [{ path: '', component: ListComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule {}
