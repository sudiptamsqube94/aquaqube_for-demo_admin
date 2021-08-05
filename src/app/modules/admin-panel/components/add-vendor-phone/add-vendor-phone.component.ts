import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Phone, Domaindata } from '../../model/vendormodel';
import { MatDialogRef } from '@angular/material';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { Validation } from 'src/app/modules/shared/validators/validation';

@Component({
  selector: 'app-add-vendor-phone',
  templateUrl: './add-vendor-phone.component.html',
  styleUrls: ['./add-vendor-phone.component.scss']
})
export class AddVendorPhoneComponent implements OnInit {

  PhoneForm : FormGroup;
  formData : Phone;
  phoneisdcode : Domaindata[];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddVendorPhoneComponent>, private adminpnalService : AdminPanelMainService) { }

  ngOnInit() {
    this.PhoneForm = this.fb.group({
      ph_isd_code:['', [Validators.required]],
      ph_no:['', [Validators.required, Validation.phonenumber]],
    });

    this.adminpnalService.getCountryCode().subscribe(
      (data) => {
        this.phoneisdcode = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  CancelOperation() {
    this.dialogRef.close();
  }

  onSubmit(form) {
    this.formData = {
      ph_isd_code : form.controls.ph_isd_code.value,
      ph_no : form.controls.ph_no.value,
    }
    this.dialogRef.close(this.formData);
  }
}
