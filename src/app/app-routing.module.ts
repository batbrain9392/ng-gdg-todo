import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureGuard } from './core/guards';

const routes: Routes = [
  {
    path: 'todos',
    loadChildren: () =>
      import('./feature/todos/todos.module').then(m => m.TodosModule),
    canLoad: [FeatureGuard],
    canActivate: [FeatureGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
