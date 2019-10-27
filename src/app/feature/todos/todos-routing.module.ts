import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodosComponent } from './todos.component';
import { ListComponent, DetailsComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
    children: [
      { path: ':todoId', component: DetailsComponent },
      { path: '', component: ListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule {}
