import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViewPinGraphComponent } from './modules/dashboard/components/view-pin-graph/view-pin-graph.component';


const routes: Routes = [
  { path:'login', component:LoginComponent},
  { path:'', redirectTo:'/login', pathMatch: "full" },
  { path:'allGraph', component:ViewPinGraphComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
