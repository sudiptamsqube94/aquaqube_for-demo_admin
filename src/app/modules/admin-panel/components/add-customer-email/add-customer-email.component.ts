import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Email } from '../../model/customermodel';
import { MatDialogRef } from '@angular/material';
import { Validation } from 'src/app/modules/shared/validators/validation';

@Component({
  selector: 'app-add-customer-email',
  templateUrl: './add-customer-email.component.html',
  styleUrls: ['./add-customer-email.component.scss']
})
export class AddCustomerEmailComponent implements OnInit {

  EmailForm : FormGroup;
  formData : Email;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddCustomerEmailComponent>) { }

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
