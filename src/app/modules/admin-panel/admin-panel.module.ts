import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMainComponent } from './pages/admin-main/admin-main.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { MaterialModule } from 'src/app/material/material.module';
import { VendorTableComponent } from './components/vendor-table/vendor-table.component';
import { VendorDetailsComponent } from './components/vendor-details/vendor-details.component';
import { AgGridModule } from 'ag-grid-angular';
import { AddVendorFormComponent } from './components/add-vendor-form/add-vendor-form.component';
import { CustomerTableComponent } from './components/customer-table/customer-table.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { AddCustomerFormComponent } from './components/add-customer-form/add-customer-form.component';
import { AddCustomerAddressComponent } from './components/add-customer-address/add-customer-address.component';
import { AddCustomerLegalinfoComponent } from './components/add-customer-legalinfo/add-customer-legalinfo.component';
import { AddCustomerPhoneComponent } from './components/add-customer-phone/add-customer-phone.component';
import { AddCustomerEmailComponent } from './components/add-customer-email/add-customer-email.component';
import { AddCustomerAdditionalinfoComponent } from './components/add-customer-additionalinfo/add-customer-additionalinfo.component';
import { AddCustomerBranchComponent } from './components/add-customer-branch/add-customer-branch.component';
import { AddVendorAddressComponent } from './components/add-vendor-address/add-vendor-address.component';
import { AddVendorLegalinfoComponent } from './components/add-vendor-legalinfo/add-vendor-legalinfo.component';
import { AddVendorPhoneComponent } from './components/add-vendor-phone/add-vendor-phone.component';
import { AddVendorEmailComponent } from './components/add-vendor-email/add-vendor-email.component';
import { AddVendorAdditionalinfoComponent } from './components/add-vendor-additionalinfo/add-vendor-additionalinfo.component';
import { CustomerAssignComponent } from './components/customer-assign/customer-assign.component';
import { CustomerAssignDialogComponent } from './components/customer-assign-dialog/customer-assign-dialog.component';
import { DeviceTableComponent } from './components/device-table/device-table.component';
import { AddDeviceComponent } from './components/add-device/add-device.component';
import { SuccessSnackberComponent } from '../shared/components/success-snackber/success-snackber.component';
import { ErrorSnackberComponent } from '../shared/components/error-snackber/error-snackber.component';
import { SharedModule } from '../shared/shared.module';
import { DeviceDetailComponent } from './components/device-detail/device-detail.component';
import { DeviceAssignmentComponent } from './components/device-assignment/device-assignment.component';
import { DeviceManagementComponent } from './components/device-management/device-management.component';
import { AddSensorFormComponent } from './components/add-sensor-form/add-sensor-form.component';
import { CustomerAssignFormComponent } from './components/customer-assign-form/customer-assign-form.component';
import { AssignmentDetialComponent } from './components/assignment-detial/assignment-detial.component';
import { DeviceCustomerAssignComponent } from './components/device-customer-assign/device-customer-assign.component';
import { DeviceMonitorDetailsComponent } from './components/device-monitor-details/device-monitor-details.component';
import { NumericEditorComponent } from '../shared/components/numeric-editor/numeric-editor.component';
import { NullValueComponent } from '../shared/components/null-value/null-value.component';
import { EmailEditorComponent } from '../shared/components/email-editor/email-editor.component';
import { CustomerBranchComponent } from './components/customer-branch/customer-branch.component';
import { AssignmentDetailsComponent } from './components/assignment-details/assignment-details.component';
import { DeviceActiveRendererComponent } from '../shared/components/device-active-renderer/device-active-renderer.component';
import { DeviceHealthRendererComponent } from '../shared/components/device-health-renderer/device-health-renderer.component';
import { MatErrorComponent } from '../shared/components/mat-error/mat-error.component';
import { DateTimeRendererComponent } from '../shared/components/date-time-renderer/date-time-renderer.component';
import { GraphComponent } from './components/graph/graph.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { ViewVendorCustomerComponent } from './components/view-vendor-customer/view-vendor-customer.component';
import { NodeTableComponent } from './components/node-table/node-table.component';
import { AddNodeComponent } from './components/add-node/add-node.component';
import { SensorTableComponent } from './components/sensor-table/sensor-table.component';
import { AddSensorComponent } from './components/add-sensor/add-sensor.component';
import { NodeDetailsComponent } from './components/node-details/node-details.component';
import { NodeArrayComponent } from './components/node-array/node-array.component';
import { SensorArrayViewComponent } from './components/sensor-array-view/sensor-array-view.component';
import { DevicePanelComponent } from './components/device-panel/device-panel.component';



@NgModule({
  declarations: [AdminMainComponent, AdminViewComponent, VendorTableComponent, VendorDetailsComponent, AddVendorFormComponent, CustomerTableComponent, CustomerDetailsComponent, AddCustomerFormComponent, AddCustomerAddressComponent, AddCustomerLegalinfoComponent, AddCustomerPhoneComponent, AddCustomerEmailComponent, AddCustomerAdditionalinfoComponent, AddCustomerBranchComponent, AddVendorAddressComponent, AddVendorLegalinfoComponent, AddVendorPhoneComponent, AddVendorEmailComponent, AddVendorAdditionalinfoComponent, CustomerAssignComponent, CustomerAssignDialogComponent, DeviceTableComponent, AddDeviceComponent, DeviceDetailComponent, DeviceAssignmentComponent, DeviceManagementComponent, CustomerAssignFormComponent, AddSensorFormComponent, AssignmentDetialComponent, DeviceCustomerAssignComponent, DeviceMonitorDetailsComponent, CustomerBranchComponent, AssignmentDetailsComponent, GraphComponent, SidenavComponent, FooterComponent, ViewVendorCustomerComponent, NodeTableComponent, AddNodeComponent, SensorTableComponent, AddSensorComponent, NodeDetailsComponent, NodeArrayComponent, SensorArrayViewComponent, FooterComponent, DevicePanelComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    MaterialModule,
    AgGridModule.withComponents([NullValueComponent, DeviceActiveRendererComponent, DeviceHealthRendererComponent, NumericEditorComponent, DateTimeRendererComponent])
  ],
  entryComponents : [ AddVendorFormComponent, MatErrorComponent, AddCustomerFormComponent, AddCustomerAddressComponent, AddCustomerLegalinfoComponent, AddCustomerPhoneComponent, AddCustomerEmailComponent, AddCustomerAdditionalinfoComponent, AddCustomerBranchComponent, AddVendorAddressComponent, AddVendorLegalinfoComponent, AddVendorPhoneComponent, AddVendorEmailComponent, AddVendorAdditionalinfoComponent, CustomerAssignDialogComponent, AddDeviceComponent, SuccessSnackberComponent, ErrorSnackberComponent, AddSensorFormComponent, NumericEditorComponent, NullValueComponent, EmailEditorComponent, DeviceCustomerAssignComponent, ViewVendorCustomerComponent, AddNodeComponent, AddSensorComponent ]
})
export class AdminPanelModule { }
