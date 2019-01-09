import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserComponent } from '../user/user.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';

export const routes: Routes = [
  { path: 'master-user', component: UserComponent},
  { path: 'register-user', component: RegisterComponent},
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class PathRoutingModule { }