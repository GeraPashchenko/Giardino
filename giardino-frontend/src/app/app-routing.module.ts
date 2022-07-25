import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { routesEnum } from '../environments/routes.enum';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: routesEnum.DEFAULT, pathMatch: 'full', redirectTo: routesEnum.AUTH },
  { path: routesEnum.AUTH, loadChildren: () => import('./components/auth/auth.component') },
  { path: routesEnum.HOME, component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
