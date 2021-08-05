import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VendorMainComponent } from './pages/vendor-main/vendor-main.component';
import { VendorGuardService } from 'src/app/service/vendor-guard.service';

const routes:Routes = [
  { path:"vendor-panel", component:VendorMainComponent, } //canActivate:[VendorGuardService]
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
