import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Customer, CustomerAssignment } from '../../model/customermodel';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customer-assign-dialog',
  templateUrl: './customer-assign-dialog.component.html',
  styleUrls: ['./customer-assign-dialog.component.scss']
})
export class CustomerAssignDialogComponent implements OnInit {
  
  customerassignForm  : FormGroup;
  customerAssignment: CustomerAssignment
  private customer: Customer;
  vendorData: any[] = [];
  constructor(private fb : FormBuilder, public dialogRef : MatDialogRef<CustomerAssignDialogComponent>, @Inject(MAT_DIALOG_DATA)private data: Customer, private adminService: AdminPanelMainService, private spinner: NgxSpinnerService) {
    this.customer = data;
   }

  ngOnInit() {
    this.customerassignForm = this.fb.group({
      customer_name : '',
      vendor : '',
      assign_effective_from : '',
      assign_effective_to : ''
    });

    if (this.customer && this.customer.customer_id > 0) {
      this.customerassignForm.patchValue(this.customer)
    }

    this.adminService.getVendorNameId().subscribe(
      (data) => {
        this.spinner.show()
        console.log(data);
        this.vendorData = data
        this.spinner.hide()
      },
      (error) => {
        console.log(error)
      }
    );
  }

  CancelOperation() {
    this.dialogRef.close();
  }
  onSubmit(form){
    this.customerAssignment = {
      customer_id: this.customer.customer_id,
      vendor_id: form.controls.vendor.value.vendor_id,
      vendor_name: form.controls.vendor.value.vendor_name,
      assign_effective_from: form.controls.assign_effective_from.value,
      assign_effective_to: form.controls.assign_effective_to.value
    }
    
    this.dialogRef.close(this.customerAssignment);
  }
}
