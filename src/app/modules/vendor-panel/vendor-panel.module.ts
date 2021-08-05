import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorMainComponent } from './pages/vendor-main/vendor-main.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { VendorRoutingModule } from './vendor-routing.module';
import { ShowVendorCustomerComponent } from './components/show-vendor-customer/show-vendor-customer.component';
import { FooterComponent } from 'src/app/common/footer/footer.component';



@NgModule({
  declarations: [VendorMainComponent, ShowVendorCustomerComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    VendorRoutingModule,
    SharedModule
  ]
})
export class VendorPanelModule { }
