import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserComponent } from '../user/user.component';

export const routes: Routes = [
  // {path:'',component:HomeComponent},
  // {path:'master-gender', component:GenderComponent},
  // {path:'login', component:LoginComponent},
  // {path:'register', component:RegisterComponent},
  { path:'master-user', component: UserComponent}
  // {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class PathRoutingModule { }