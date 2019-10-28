import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards';

const routes: Routes = [
  {
    path: 'todos',
    loadChildren: () =>
      import('./feature/todos/todos.module').then(m => m.TodosModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
