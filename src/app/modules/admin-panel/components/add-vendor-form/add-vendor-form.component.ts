import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Vendor } from '../../model/vendormodel';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { SuccessSnackberComponent } from 'src/app/modules/shared/components/success-snackber/success-snackber.component';

@Component({
  selector: 'app-add-vendor-form',
  templateUrl: './add-vendor-form.component.html',
  styleUrls: ['./add-vendor-form.component.scss']
})
export class AddVendorFormComponent implements OnInit {

  // vendor form
  vendorForm : FormGroup;

  formData : Vendor;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddVendorFormComponent>, @Inject(MAT_DIALOG_DATA) public data : Vendor, private adminMainService : AdminPanelMainService, private _snackBar : MatSnackBar) {
    this.formData = data;
   }

  ngOnInit() {
    this.vendorForm = this.fb.group({
      vendor_name : ['',[Validators.required]],
      vendor_code : ['',[Validators.required]],
      vendor_type : ['',[Validators.required]],
    });

    if(this.formData && this.formData.vendor_id > 0) {
      this.vendorForm.patchValue(this.formData);
    }
  }

  onSubmit(form) {
    if(this.formData && this.formData.vendor_id > 0) {
      this.formData.vendor_name = form.controls.vendor_name.value,
      this.formData.vendor_code = form.controls.vendor_code.value,
      this.formData.vendor_type = form.controls.vendor_type.value,
      this.adminMainService.updateVendor(this.formData).subscribe(
        (data)=> {
          console.log("this is form add vendor form:  "+data);
          this.dialogRef.close("success");
          this._snackBar.openFromComponent(SuccessSnackberComponent, {data : "Vendor Updated Successfully.", duration : 3000 });
        },
        (error) => {
          console.error(error);
          this.dialogRef.close();
        }
      );
    }
    else {
      this.formData = {
        vendor_name : form.controls.vendor_name.value,
        vendor_code : form.controls.vendor_code.value,
        vendor_type : form.controls.vendor_type.value,
        additional_attributes : [],
        legal_infos : [],
        phones : [],
        emails : [],
        addresses : []
      }
      this.adminMainService.createVendor(this.formData).subscribe(
        (data) => {
          this.dialogRef.close("success");
          this._snackBar.openFromComponent(SuccessSnackberComponent, {data : "Vendor Add Successfully.", duration : 3000 });
        },
        (error) => {
          console.error(error);
          this.dialogRef.close();
        }
      );
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
