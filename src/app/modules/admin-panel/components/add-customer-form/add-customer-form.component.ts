import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { SuccessSnackberComponent } from 'src/app/modules/shared/components/success-snackber/success-snackber.component';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { Domaindata, Customer } from '../../model/customermodel';

@Component({
  selector: 'app-add-customer-form',
  templateUrl: './add-customer-form.component.html',
  styleUrls: ['./add-customer-form.component.scss']
})
export class AddCustomerFormComponent implements OnInit {

  // Customer form
  customerForm : FormGroup;
  customerType : Domaindata[];
  formData : Customer;

  constructor(private fb : FormBuilder, public dialogRef : MatDialogRef<AddCustomerFormComponent>, private _snackBar : MatSnackBar, private adminpnalService : AdminPanelMainService, @Inject(MAT_DIALOG_DATA) public data : Customer ) { 
    this.formData = data;
  }

  ngOnInit() {
    
    this.customerForm = this.fb.group({
      customer_name : ['',[Validators.required]],
      customer_code : ['',[Validators.required]],
      customer_type : ['',[Validators.required]],
    });

    if(this.formData && this.formData.customer_id > 0) {
      this.customerForm.patchValue(this.formData);
    }
    
    this.adminpnalService.getCustomerType().subscribe(
      (data) => {
        this.customerType = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
    //this._snackBar.openFromComponent(SuccessSnackberComponent,{ data : "test success component", duration : 3000 });
  }

  onSubmit(form) {
    if (this.formData && this.formData.customer_id > 0) {
      this.formData.customer_name = form.controls.customer_name.value,
      this.formData.customer_code = form.controls.customer_code.value,
      this.formData.customer_type = form.controls.customer_type.value,
      this.adminpnalService.updateCustomer(this.formData).subscribe(
        (data) => {
          //console.log(data);
          this.dialogRef.close("success");
          //console.log("This is form add customer edit form  "+data);
          if(data == "001") {
            //console.log("This is form add customer edit form if block  "+data);
            this._snackBar.openFromComponent(SuccessSnackberComponent, {data : "Customer Updated Successfully.", duration : 3000 });
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } 
    else {
      this.formData = {
        customer_name : form.controls.customer_name.value,
        customer_code : form.controls.customer_code.value,
        customer_type : form.controls.customer_type.value,
        attributes : [],
        infos : [],
        phones : [],
        emails : [],
        addresses : [],
        branches : []
      }
      //this.dialogRef.close(this.formData);
      this.adminpnalService.createCustomer(this.formData).subscribe(
        (data) => {
          this.dialogRef.close("success");
          //console.log("This is form add customer add form  "+data);
          if(data == "001") {
            this._snackBar.openFromComponent(SuccessSnackberComponent, {data : "Customer Add Successfully.", duration : 3000 });
          }
        },
        (error) => {
          console.error(error);
          this.dialogRef.close();
        }
      );
    }
  }

}
