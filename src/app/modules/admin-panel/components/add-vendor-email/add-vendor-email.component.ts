import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Email } from '../../model/vendormodel';
import { MatDialogRef } from '@angular/material';
import { Validation } from 'src/app/modules/shared/validators/validation';

@Component({
  selector: 'app-add-vendor-email',
  templateUrl: './add-vendor-email.component.html',
  styleUrls: ['./add-vendor-email.component.scss']
})
export class AddVendorEmailComponent implements OnInit {

  EmailForm : FormGroup;
  formData : Email;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddVendorEmailComponent>) { }

  ngOnInit() {
    this.EmailForm=this.fb.group({
      eml_address:['', [Validators.required, Validation.email]],
    });
  }

  CancelOperation() {
    this.dialogRef.close();
  }

  onSubmit(form) {
    this.formData = {
      eml_address : form.controls.eml_address.value,
    }
    this.dialogRef.close(this.formData);
  }

}
