import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { Vendor } from '../../model/vendormodel';
import { Customer } from '../../model/customermodel';

@Component({
  selector: 'app-view-vendor-customer',
  templateUrl: './view-vendor-customer.component.html',
  styleUrls: ['./view-vendor-customer.component.scss']
})
export class ViewVendorCustomerComponent implements OnInit {

  AdvanceSearchForm : FormGroup;
  allVendor : Vendor[];
  allCustomer : Customer[];

  constructor(private fb : FormBuilder, public dialogRef : MatDialogRef<ViewVendorCustomerComponent>,private spinner : NgxSpinnerService, private adminMainService : AdminPanelMainService) { }

  ngOnInit() {
    this.spinner.show();
    this.adminMainService.getAllVendor().subscribe(
      (data) => {
        console.log(data);
        this.allVendor = data;
        this.adminMainService.getAllCustomer().subscribe(
          (data) => {
            this.allCustomer = data;
            console.log(data);
          },
          (error) => {
            console.error(error);
          }
        );
        this.spinner.hide();
      },
      (error) => {
        console.error(error);
        this.spinner.hide();
      }
    );
    this.AdvanceSearchForm = this.fb.group({
      vendor : '',
      customer : '',
    });
  }

  CancelOperation() {
    this.dialogRef.close();
  }

  onSubmit(form) {

  }

}
