import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AddVendorFormComponent } from '../../components/add-vendor-form/add-vendor-form.component';
import { AddCustomerFormComponent } from '../../components/add-customer-form/add-customer-form.component';
import { AddCustomerAddressComponent } from '../../components/add-customer-address/add-customer-address.component';
import { AddCustomerLegalinfoComponent } from '../../components/add-customer-legalinfo/add-customer-legalinfo.component';
import { AddCustomerPhoneComponent } from '../../components/add-customer-phone/add-customer-phone.component';
import { AddCustomerEmailComponent } from '../../components/add-customer-email/add-customer-email.component';
import { AddCustomerAdditionalinfoComponent } from '../../components/add-customer-additionalinfo/add-customer-additionalinfo.component';
import { AddCustomerBranchComponent } from '../../components/add-customer-branch/add-customer-branch.component';
import { AddVendorAddressComponent } from '../../components/add-vendor-address/add-vendor-address.component';
import { AddVendorLegalinfoComponent } from '../../components/add-vendor-legalinfo/add-vendor-legalinfo.component';
import { AddVendorPhoneComponent } from '../../components/add-vendor-phone/add-vendor-phone.component';
import { AddVendorEmailComponent } from '../../components/add-vendor-email/add-vendor-email.component';
import { AddVendorAdditionalinfoComponent } from '../../components/add-vendor-additionalinfo/add-vendor-additionalinfo.component';
import { CustomerAssignDialogComponent } from '../../components/customer-assign-dialog/customer-assign-dialog.component';
import { AddDeviceComponent } from '../../components/add-device/add-device.component';
import { Device, Address, Customer, Domaindata, DeviceMonitor, Branch, DeviceAssignment } from '../../model/customermodel';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { SuccessSnackberComponent } from 'src/app/modules/shared/components/success-snackber/success-snackber.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddSensorFormComponent } from '../../components/add-sensor-form/add-sensor-form.component';
import { Vendor } from '../../model/vendormodel';
import { DeviceCustomerAssignComponent } from '../../components/device-customer-assign/device-customer-assign.component';
import { from, interval } from 'rxjs';
import { error } from 'util';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { startWith, switchMap } from 'rxjs/operators';
import { ViewVendorCustomerComponent } from '../../components/view-vendor-customer/view-vendor-customer.component';
import { AddNodeComponent } from '../../components/add-node/add-node.component';
import { AddSensorComponent } from '../../components/add-sensor/add-sensor.component';
import { sensor, node, gateway, assignmentinfo } from '../../model/gateway';
import { DeviceAssignmentComponent } from '../../components/device-assignment/device-assignment.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss'],
  animations: [
    trigger('sidenavState', [
      state('open', style({
        flex:"0 1 calc(18% - 5px)"
      })),
      state('shrunk', style({
        flex:"0 1 calc(4% - 5px)",
        fontSize: "0px"
      })),
      transition('shrunk => open', animate('500ms ease-in')),
      transition('open => shrunk', animate('500ms ease-out'))
    ]),
    trigger('mainContentState', [
      state('shrunk', style({
        flex:"0 1 calc(96% - 5px)"
      })),
      state('open', style({
        flex:"0 1 calc(82% -5px)"
      })),
      transition('shrunk => open', animate('500ms ease-in')),
      transition('open => shrunk', animate('500ms ease-out'))
    ]),
  ]
})
export class AdminMainComponent implements OnInit {

  //  togol side nav 
  sidenavState: string = 'open';

  selectedTabIndex : number = 0;
  //open add vendor in popup
  addvendordialog :  MatDialogRef<AddVendorFormComponent>;

  // Open add customer in popup
  addcustomerdialog : MatDialogRef<AddCustomerFormComponent>;

  // Open address in popup
  customeraddressdialog : MatDialogRef<AddCustomerAddressComponent>;

  // Open legal info for customer in popup
  customerlegalinfodialog  : MatDialogRef<AddCustomerLegalinfoComponent>;

  // Open phone for customer in popup
  customerphonedialog : MatDialogRef<AddCustomerPhoneComponent>;

  // Open email for customer in popup
  customeremaildialog : MatDialogRef<AddCustomerEmailComponent>;

  // Open additional information in popup
  custoeraddinfodialog : MatDialogRef<AddCustomerAdditionalinfoComponent>;

  // Open branch in popup
  customerbranchdialog : MatDialogRef<AddCustomerBranchComponent>;

  // Open vendor address in popup
  vendoraddressdilog : MatDialogRef<AddVendorAddressComponent>;

  // Open vendor legalinfo in popup
  vendorlegalinfodialog : MatDialogRef<AddVendorLegalinfoComponent>;

  // Open vendor phone in popup
  vendorphonedialog : MatDialogRef<AddVendorPhoneComponent>;

  // Open vendor email in popup
  vendoremaildialog : MatDialogRef<AddVendorEmailComponent>;

  // Open vendor additional info popup
  vendoraddinfodialog : MatDialogRef<AddVendorAdditionalinfoComponent>;

  // Open customer assignment popup
  customerassigndialog : MatDialogRef<CustomerAssignDialogComponent>;

  //device assign dialog
  deviceAssignDialog : MatDialogRef<AddDeviceComponent>;

  //sensor assign dialog
  sensorAssignDialog: MatDialogRef<AddSensorFormComponent>;
  //assign a device to customer form
  deviceCustomerDialog : MatDialogRef<DeviceCustomerAssignComponent>;

  // view all customer and vendor after click go to dashboard button
  viewVendorCustomer : MatDialogRef<ViewVendorCustomerComponent>;

  //node create form
  addNodeForm : MatDialogRef<AddNodeComponent>;

  //sensor create form
  addSensorForm : MatDialogRef<AddSensorComponent>
  //customer name and id object
  customerNameandId: Customer;
  customerName: string;

  selectedTab = 0;

  deviceName: string;
  deviceId: number;
  deviceDetail: Device;
  // Hold All customer Data
  customerData : Customer[];

  // Hold all vendor data
  vendorData : Vendor[];

  //Hold all the devices 
  gateways : gateway[];
  gateway : gateway;
  //holds all the device health information
  deviceHealthData: DeviceMonitor[]

  addresstype : Domaindata[];
  cuntrycode : Domaindata[];
  LegalinfoType : Domaindata[];
  customerType : Domaindata[];

  // value to customer details components
  customer : Customer;

  // value to vendor details components
  vendor : Vendor;

  //assignment table rowId
  rowId : number;
  //sensor 
  sensors : sensor[] = [];
  sensorInfo : sensor;
  //nodes
  nodes : node[] = [];
  nodeInfo : node;
  sensorsOfNode : sensor[];
  //device assign info
  selectedAssignmentInfo : assignmentinfo;
  assignmentInformations : assignmentinfo [] = [];
  constructor(public dialog: MatDialog, private adminpanelService: AdminPanelMainService, private _snackBar: MatSnackBar, private spinner : NgxSpinnerService, private router : Router) { }

  ngOnInit() {
    this.customer = {
      customer_id : 0
    };

    this.vendor = {
      vendor_id : 0
    };

    this.deviceDetail = {
      device_id :  0
    };

    this.customerNameandId = {
      customer_id : 0
    }

    this.spinner.show();
    this.adminpanelService.getAllCustomer().subscribe(
      (data) => {
        // console.log(data);
        this.customerData = data.reverse();
        this.adminpanelService.getAddressType().subscribe(
          (data) => {
            this.addresstype = data;
            this.adminpanelService.getCountryCode().subscribe(
              (data) => {
                this.cuntrycode = data;
                this.adminpanelService.getLegalInfoType().subscribe(
                  (data) => {
                    this.LegalinfoType = data;
                    // console.log("legal info for grid  "+data);
                    this.adminpanelService.getCustomerType().subscribe(
                      (data) => {
                        this.customerType = data;
                        // console.log("customer type form main  "+data);
                      },
                      (error) => {
                        console.error(error);
                        this.spinner.hide();
                      }
                    );
                  },
                  (error) => {
                    console.log(error);
                    this.spinner.hide();
                  }
                );
              },
              (error) => {
                console.log(error);
                this.spinner.hide();
              }
            );
            // this.adminpanelService.getLegalInfoType().subscribe(
            //   (data) => {
            //     this.LegalinfoType = data;
            //     console.log("legal info for grid  "+data);
            //     this.adminpanelService.getCustomerType().subscribe(
            //       (data) => {
            //         this.customerType = data;
            //         console.log("customer type form main  "+data);
            //       },
            //       (error) => {
            //         console.error(error);
            //         this.spinner.hide();
            //       }
            //     );
            //   },
            //   (error) => {
            //     console.log(error);
            //     this.spinner.hide();
            //   }
            // );
          },
          (error) => {
            console.log(error);
            this.spinner.hide();
          }
        );
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
    this.adminpanelService.getAllVendor().subscribe(
      (data) => {
        this.vendorData = data.reverse();
        // console.log(data);
        setTimeout(()=>{
          this.spinner.hide()
        }, 5000);
        // this.spinner.hide();
      },
      (error) => {
        console.error(error);
        this.spinner.hide();
      }
    );
    // this.adminpanelService.getDeviceHealth().subscribe(
    //   (data) => {
    //     console.log(data)
    //     this.deviceHealthData = data.reverse()
    //     this.spinner.hide()
    //   },
    //   (error) => {
    //     console.log(error)
    //     this.spinner.hide()
    //   }
    // );
  }

  getCustomerData(Id : number) {
    //console.log('from get customer data ' + Id)
    this.spinner.show();
    this.adminpanelService.getACustomer(Id).subscribe(
      (data) => {
        // console.log("get a customer "+ data);
        this.customer = data;
        this.spinner.hide();
      },
      (error) => {
        console.error(error);
        this.spinner.hide();
      }
    );
  }

  getVendorData(Id : number) {
    // console.log('from get vemdor data ' + Id);
    this.adminpanelService.getAVendorDetails(Id).subscribe(
      (data) => {
        this.vendor = data;
        // console.log("Data form get vendor data function:  "+data);
      },
      (error) => {
        // console.error(error);
      }
    ); 
  }

  getSensorData(Id : number) {
    this.adminpanelService.getAdevice(Id).subscribe(
      (data) => {
        // console.log("Form get sensor data method:  "+data);
        this.deviceDetail = data[0];
      },
      (error) => {
        console.error(error);
      
      }
    );
  }

  openPopup(value : number) {
    switch (value) {
      // Open add vendor dialog
      case 0:
        this.addvendordialog = this.dialog.open(AddVendorFormComponent);
        this.addvendordialog.afterClosed().subscribe(result => {
          if(result) {
            this.spinner.show();
            this.adminpanelService.getAllVendor().subscribe(
              (data) => {
                this.vendorData = data.reverse();
                this.spinner.hide();
              },
              (error) => {
                console.error(error);
                this.spinner.hide();
              }
            );
          }
        });
      break;

      // Open edit vengor dialog
      case 1 :
        if(this.vendor.vendor_id > 0) {
          this.addvendordialog = this.dialog.open(AddVendorFormComponent, { data : this.vendor} );
          this.addvendordialog.afterClosed().subscribe(result => {
            if(result) {
              this.spinner.show();
              this.adminpanelService.getAllVendor().subscribe(
                (data) => {
                  this.vendorData = data.reverse();
                  this.spinner.hide();
                },
                (error) => {
                  console.error(error);
                  this.spinner.hide();
                }
              );
            }
          });
        }
      break;
      
      // Open add customer dialog
      case 2:
        this.addcustomerdialog = this.dialog.open(AddCustomerFormComponent);

        this.addcustomerdialog.afterClosed().subscribe(result => {
          if(result) {
            this.spinner.show();
            this.adminpanelService.getAllCustomer().subscribe(
              (data) => {
                this.customerData = data.reverse();
                this.spinner.hide();
              },
              (error) => {
                console.error(error);
                this.spinner.hide();
              }
            );
          }
        });
      break;

      // Edit customer dialog
      case 3 :
        if(this.customer.customer_id > 0) {
          this.addcustomerdialog = this.dialog.open(AddCustomerFormComponent, {data : this.customer});
          this.addcustomerdialog.afterClosed().subscribe(result => {
            if(result) {
              this.spinner.show();
              this.adminpanelService.getAllCustomer().subscribe(
                (data) => {
                  this.customerData = data.reverse();
                  this.spinner.hide();
                },
                (error) => {
                  console.error(error);
                  this.spinner.hide();
                }
              );
            }
          });
        }
      break;

      // Open customer address dialog
      case 4:
        this.customeraddressdialog = this.dialog.open(AddCustomerAddressComponent);
        this.customeraddressdialog.afterClosed().subscribe(result => {
          console.log(result);
          if(result) {
            this.customer.addresses.push(result);
            this.spinner.show();
            this.adminpanelService.updateCustomer(this.customer).subscribe(
              (data) => {
                if (data == "001") {
                  this._snackBar.openFromComponent(SuccessSnackberComponent,
                    { data: "Address Added Successfully.", duration: 3000});
                  this.getCustomerData(this.customer.customer_id);
                }
                else {
                  this.adminpanelService.getError(data);
                }
                this.spinner.hide();
              },
              (error) => {
                console.error(error);
                this.spinner.hide();
              }
            );
          }
        });
      break;

      // Open customer legal info dialog
      case 5: 
        this.customerlegalinfodialog = this.dialog.open(AddCustomerLegalinfoComponent);
        this.customerlegalinfodialog.afterClosed().subscribe(result=> {
          if(result) {
            this.customer.infos.push(result);
            this.spinner.show();
            this.adminpanelService.updateCustomer(this.customer).subscribe(
              (data) => {
                //console.log(data);
                if (data == "001") {
                  this._snackBar.openFromComponent(SuccessSnackberComponent,{ data: "Legal Info Added Successfully",duration: 3000 }); 
                  this.getCustomerData(this.customer.customer_id);
                }
                else {
                  this.adminpanelService.getError(data);
                }
                this.spinner.hide();
              },
              (error) => {
                console.error(error);
                this.spinner.hide();
              }
            );
          }
        });
      break;

      // Open customer phone dialog
      case 6:
        this.customerphonedialog = this.dialog.open(AddCustomerPhoneComponent);
        this.customerphonedialog.afterClosed().subscribe(result => {
          if(result) {
            this.customer.phones.push(result);
            this.spinner.show();
            this.adminpanelService.updateCustomer(this.customer).subscribe(
              (data)=> {
                if (data == "001") {
                  this._snackBar.openFromComponent(SuccessSnackberComponent,{data : " Phone Added Successfully",duration: 3000 }); 
                  this.getCustomerData(this.customer.customer_id);
                }
                else {
                  this.adminpanelService.getError(data);
                }
                this.spinner.hide();
              },
              (error) => {
                console.error(error);
                this.spinner.hide();
              }
            );
          }
        });
      break;

      // Open customer email dialog
      case 7:
        this.customeremaildialog = this.dialog.open(AddCustomerEmailComponent);
        this.customeremaildialog.afterClosed().subscribe(result => {
          if(result) {
            this.customer.emails.push(result);
            this.spinner.show();
            this.adminpanelService.updateCustomer(this.customer).subscribe(
              (data) => {
                if(data == "001") {
                  this._snackBar.openFromComponent(SuccessSnackberComponent,{data : "Email Added Successfully",duration: 3000 }); 
                  this.getCustomerData(this.customer.customer_id);
                }
                else {
                  this.adminpanelService.getError(data);
                }
                this.spinner.hide();
              },
              (error) => {
                console.error(error);
                this.spinner.hide();
              }
            );
          }
        });
      break;

      // Open customer additoional information  dialog
      case 8:
        this.custoeraddinfodialog = this.dialog.open(AddCustomerAdditionalinfoComponent);
        this.custoeraddinfodialog.afterClosed().subscribe(result => {
          if(result) {
            this.customer.attributes.push(result);
            this.spinner.show();
            this.adminpanelService.updateCustomer(this.customer).subscribe(
              (data) => {
                console.log("form additional info popup:  "+data);
                if(data == "001") {
                  this._snackBar.openFromComponent(SuccessSnackberComponent,{data : "Additional Attribute Added Successfully",duration: 3000 }); 
                  this.getCustomerData(this.customer.customer_id);
                }
                else {
                  this.adminpanelService.getError(data);
                }
                this.spinner.hide();
              },
              (error) => {
                console.error(error);
                this.spinner.hide();
              }
            );
          }
        });
      break;

      // Open customer branch dialog
      case 9:
        this.customerbranchdialog = this.dialog.open(AddCustomerBranchComponent);
        this.customerbranchdialog.afterClosed().subscribe( result => {
          if(result) {
            this.customer.branches.push(result);
            this.spinner.show();
            this.adminpanelService.updateCustomer(this.customer).subscribe(
              (data) => {
                console.log("form branch popup:  "+data);
                
                if(data == "001") {
                  this._snackBar.openFromComponent(SuccessSnackberComponent,{data : "Branch Added Successfully",duration: 3000 }); 
                  this.getCustomerData(this.customer.customer_id);
                }
                else {
                  this.adminpanelService.getError(data);
                }
                this.spinner.hide();
              },
              (error) => {
                console.error(error);
                this.spinner.hide();
              }
            );
          }
        });
      break;

      // Open vendor address dialog
      case 10:
        this.vendoraddressdilog = this.dialog.open(AddVendorAddressComponent);
        this.vendoraddressdilog.afterClosed().subscribe(result => {
          if(result) {
            console.log("Updating...");
            console.log(this.vendor);
            this.vendor.addresses.push(result);
            this.spinner.show();
            this.adminpanelService.updateVendor(this.vendor).subscribe(
              (data) => {
                console.log("form add vendor address:  "+data);
                //this.getVendorData(this.vendor.vendor_id);
                if (data == "001") {
                  this._snackBar.openFromComponent(SuccessSnackberComponent,
                    { data: "Address Added Successfully.", duration: 3000});
                  this.getVendorData(this.vendor.vendor_id);
                }
                else {
                  this.adminpanelService.getError(data);
                }
                this.spinner.hide();
              },
              (error) => {
                console.error(error);
                this.spinner.hide();
              }
            );
          }
        });
      break;

      // Open vendor legal info dialog
      case 11: 
        this.vendorlegalinfodialog = this.dialog.open(AddVendorLegalinfoComponent);
        this.vendorlegalinfodialog.afterClosed().subscribe(result=> {
          if(result) {
            this.vendor.legal_infos.push(result);
            this.spinner.show();
            this.adminpanelService.updateVendor(this.vendor).subscribe(
              (data) => {
                //console.log(data);
                if (data == "001") {
                  this._snackBar.openFromComponent(SuccessSnackberComponent,{ data: "Legal Info Added Successfully",duration: 3000 }); 
                  this.getVendorData(this.vendor.vendor_id);
                }
                else {
                  this.adminpanelService.getError(data);
                }
                this.spinner.hide();
              },
              (error) => {
                console.error(error);
                this.spinner.hide();
              }
            );
          }
        });
      break;

      // Open vendor phone dialog
      case 12:
        this.vendorphonedialog = this.dialog.open(AddVendorPhoneComponent);
        this.vendorphonedialog.afterClosed().subscribe(result => {
          if(result) {
            this.vendor.phones.push(result);
            this.spinner.show();
            this.adminpanelService.updateVendor(this.vendor).subscribe(
              (data)=> {
                if (data == "001") {
                  this._snackBar.openFromComponent(SuccessSnackberComponent,{data : " Phone Added Successfully",duration: 3000 }); 
                  this.getVendorData(this.vendor.vendor_id);
                }
                else {
                  this.adminpanelService.getError(data);
                }
                this.spinner.hide();
              },
              (error) => {
                console.error(error);
                this.spinner.hide();
              }
            );
          }
        });
      break;

      // Open vendor email dialog
      case 13:
        this.vendoremaildialog = this.dialog.open(AddVendorEmailComponent);
        this.vendoremaildialog.afterClosed().subscribe(result => {
          if(result) {
            console.log(result);
            this.vendor.emails.push(result);
            console.log(this.vendor);
            this.spinner.show();
            this.adminpanelService.updateVendor(this.vendor).subscribe(
              (data) => {
                console.log("add vendor email:  "+data);
                if(data == "001") {
                  this._snackBar.openFromComponent(SuccessSnackberComponent,{data : "Email Added Successfully",duration: 3000 }); 
                  this.getVendorData(this.vendor.vendor_id);
                }
                else {
                  this.adminpanelService.getError(data);
                }
                this.spinner.hide();
              },
              (error) => {
                console.error(error);
                this.spinner.hide();
              }
            );
          }
        });
      break;

      // Open vendor additoional information  dialog
      case 14:
        this.vendoraddinfodialog = this.dialog.open(AddVendorAdditionalinfoComponent);
        this.vendoraddinfodialog.afterClosed().subscribe(result => {
          if(result) {
            this.vendor.additional_attributes.push(result);
            this.spinner.show();
            this.adminpanelService.updateVendor(this.vendor).subscribe(
              (data) => {
                console.log("Vendor Additional information:  "+data);
                if(data == "001") {
                  this._snackBar.openFromComponent(SuccessSnackberComponent,{data : "Additional Attribute Added Successfully",duration: 3000 }); 
                  this.getVendorData(this.vendor.vendor_id);
                }
                else {
                  this.adminpanelService.getError(data);
                }
                this.spinner.hide();
              },
              (error) => {
                console.error(error);
                this.spinner.hide();
              }
            );
          }
        });
      break;

      // Open customer assign dialog
      case 15:
        this.customerassigndialog = this.dialog.open(CustomerAssignDialogComponent, {
          data:this.customerNameandId
        });
        this.customerassigndialog.afterClosed().subscribe(result => { 
          if (result) {
            this.spinner.show();
            this.adminpanelService.postVendorManage(result).subscribe(
              (data) => {
                if (data == "001") {
                  this._snackBar.openFromComponent(SuccessSnackberComponent,{data : "Vendor Assign Successfully",duration: 3000 });  
                } 
                else {
                  this.adminpanelService.getError(data);
                }
                this.spinner.hide();
              },
              (error) => {
                console.error(error);
                this.spinner.hide();
              }
            );
          }
        });
      break;

      //open add device dialog 
      case 16:
        this.deviceAssignDialog = this.dialog.open(AddDeviceComponent)
        this.deviceAssignDialog.afterClosed().subscribe(result => {
          if (result) {
            this.spinner.show()
            this.adminpanelService.gateAllGateways().subscribe(
              (data) => {
                this.gateways = data;
                this.spinner.hide()
              },
              (error) => {
                console.log(error);
                this.spinner.hide()
              }
            );
          }
        });
      break;

      //open edit device form
      case 17:
        this.deviceAssignDialog = this.dialog.open(AddDeviceComponent, {
          data: this.gateway
        })
        this.deviceAssignDialog.afterClosed().subscribe( result => {
          if(result){
            this.spinner.show();
            this.adminpanelService.gateAllGateways().subscribe(
              (data) => {
                this.gateways = data;
                this.spinner.hide();
              },
              (error) => {
                console.error(error);
                this.spinner.hide();
              }
            );
          }
        });
      break;

      //open sensor form
      case 18:
        this.sensorAssignDialog = this.dialog.open(AddSensorFormComponent)
        this.sensorAssignDialog.afterClosed().subscribe(result => {
          if (result) {
            this.deviceDetail.sensors.push(result);
            this.spinner.show()
            this.adminpanelService.updateDevice(this.deviceDetail).subscribe(
              (data) => {
                if (data == "001") {
                  //alert('updated successfully')
                  this._snackBar.openFromComponent(SuccessSnackberComponent,{data: "Sensor Add successfully", duration: 3000});
                  this.getSensorData(this.deviceDetail.device_id);
                }
                else {
                  this.adminpanelService.getError(data);
                }
                this.spinner.hide()
              },
              (error) => {
                console.log(error)
                this.spinner.hide()
              }
            );
          }
        });
      break;
      //open device assignment form
      case 19:
        this.deviceCustomerDialog = this.dialog.open(DeviceCustomerAssignComponent,{
        });

        this.deviceCustomerDialog.afterClosed().subscribe(result => {
          if (result) {
            this.spinner.show();
            this.adminpanelService.getAllAssignedInfo().subscribe(
              (data) => {
                console.log(data);
                this.assignmentInformations = data
                this.spinner.hide();
              },
              (error) => {
                console.error(error);
                this.spinner.hide();
              }
            );
          }
        })
      break;
      case 20:
        this.addNodeForm = this.dialog.open(AddNodeComponent)
        this.addNodeForm.afterClosed().subscribe( result => {
          if (result) {
            this.spinner.show();
            this.adminpanelService.getAllnodes().subscribe(
              (data) => {
                console.log(data)
                this.nodes = data
                this.spinner.hide();
              },
              (error) => {
                console.error(error);
                this.spinner.hide();
              }
            );
          }
        })
      break;
      case 21:
        this.addNodeForm = this.dialog.open(AddNodeComponent, {data: this.nodeInfo});
        this.addNodeForm.afterClosed().subscribe( result => {
          if (result) {
            this.spinner.show();
            this.adminpanelService.getAllnodes().subscribe(
            (data) => {
              this.nodes = data;
              this.spinner.hide();
            },
            (error) => {
              console.error(error);
              this.spinner.hide();
            }
           );
          }
        } );
      break;
      case 22:
        this.addSensorForm = this.dialog.open(AddSensorComponent)
        this.addSensorForm.afterClosed().subscribe(result => {
          if (result) {
            this.spinner.show()
            this.adminpanelService.getAllSensor().subscribe(
              (data) => {
                console.log(data);
                this.sensors = data;
                this.spinner.hide();
              },
              (error) => {
                console.error(error);
                this.spinner.hide();
              }
            );
          }
        });
      break;
      case 23:
        this.addSensorForm = this.dialog.open(AddSensorComponent, {data : this.sensorInfo});
        this.addSensorForm.afterClosed().subscribe( result => {
          if(result) {
            this.spinner.show();
            this.adminpanelService.getAllSensor().subscribe(
              (data) => {
                this.sensors = data;
                this.spinner.hide();
              },
              (error) => {
                console.error(error);
                this.spinner.hide();
              }
            );
          }
        });
      break;
      case 24:
          this.deviceCustomerDialog = this.dialog.open(DeviceCustomerAssignComponent, {data: this.selectedAssignmentInfo});
    }
  }

  getDeviceID(value){
    this.selectedTab = 5;
    // console.log(value)
    this.deviceId = value
  }

  getDeviceName(value){
    // console.log(value)
    this.deviceName = value
  }

  toDeviceAssign(value){
    this.selectedTab = 4
    this.deviceId = value
  }

  getGateway(value){
    this.gateway = value
    console.log(value)
  }
  getCustomerDetails(value : Customer) {
    this.customer = value;
  }

  openAddressEditPopup(address : Address) {
    //console.log("form address popup  "+address);
    this.customeraddressdialog = this.dialog.open(AddCustomerAddressComponent,{ data : address});
    this.customeraddressdialog.afterClosed().subscribe(result => {
      if(result) {
        this.spinner.show();
        this.adminpanelService.updateCustomer(this.customer).subscribe(
          (data) => {
            this.spinner.hide();
            //console.log(data);
            if(data == "001") {
              this._snackBar.openFromComponent(SuccessSnackberComponent, { data: "Address Updated Successfully.", duration: 3000 });
              this.getCustomerData(this.customer.customer_id);
            }
            else {
              this.adminpanelService.getError(data);
            }
          },
          (error) => {
            console.error(error);
            this.spinner.hide();
          }
        );
      }
    });
  }

  openVendorAdddressEditPopup(address : Address) {
    this.vendoraddressdilog = this.dialog.open(AddVendorAddressComponent,{ data: address});
    this.vendoraddressdilog.afterClosed().subscribe(result => {
      if(result) {
        this.spinner.show();
        this.adminpanelService.updateVendor(this.vendor).subscribe(
          (data) => {
            this.spinner.hide();
            if(data == "001") {
              this._snackBar.openFromComponent(SuccessSnackberComponent, { data: "Address Updated Successfully.", duration: 3000 });
              this.getVendorData(this.vendor.vendor_id);
            }
            else {
              this.adminpanelService.getError(data);
            }
          },
          (error) => {
            console.error(error);
            this.spinner.hide();
          }
        );
      }
    });
  }

  getVendorDetails(value : Vendor) {
    this.vendor = value;
  }

  getRowId(value){
    this.rowId = value;
  }

  getAssignmentInfo(){
    
  }

  openCustomerBranchEditPopup(value: Branch) {
    this.customerbranchdialog = this.dialog.open(AddCustomerBranchComponent,{ data: value});
    this.customerbranchdialog.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show();
        this.adminpanelService.updateCustomer(this.customer).subscribe(
          (data) => {
            if(data == "001"){
              this._snackBar.openFromComponent(SuccessSnackberComponent, { data: "Branch Updated Successfully.", duration: 3000 });
              this.getCustomerData(this.customer.customer_id);
            }
            else {
              this.adminpanelService.getError(data);
            }
            this.spinner.hide();
          },
          (error) =>  {
            console.error(error);
            this.spinner.hide();
          }
        );
      }
    });
  }

  openAssignEditPopup(value: DeviceAssignment){
    this.deviceCustomerDialog = this.dialog.open(DeviceCustomerAssignComponent, {data : value});
  }

  getCustomerName(value : Customer){
    this.customerNameandId = value;
    console.log(this.customerNameandId)
  }

  shrinkSidenav(){
    this.sidenavState = this.sidenavState === 'open' ? 'shrunk' : 'open';
  }

  TabSelectionChange(value: any) {
    this.selectedTabIndex = value.index;
  }

  VievModal() {
    this.viewVendorCustomer = this.dialog.open(ViewVendorCustomerComponent);
  }

  getSensorForEdit(value){
    this.sensorInfo = value;
  }

  getNodeForEdit(value){
    this.nodeInfo = value;
    this.sensorsOfNode = this.nodeInfo.sensors;
    console.log(value);
  }

  getAssignInfo(value){
    this.selectedAssignmentInfo = value;
    console.log(this.selectedAssignmentInfo);
    
  }

  goToDashboard(){
    this.router.navigate(["/dashboard"])
  }
}
