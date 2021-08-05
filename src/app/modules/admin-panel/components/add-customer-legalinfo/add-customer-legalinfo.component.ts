import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LegalInfo, Domaindata } from '../../model/customermodel';
import { MatDialogRef } from '@angular/material';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { Validation } from 'src/app/modules/shared/validators/validation';

@Component({
  selector: 'app-add-customer-legalinfo',
  templateUrl: './add-customer-legalinfo.component.html',
  styleUrls: ['./add-customer-legalinfo.component.scss']
})
export class AddCustomerLegalinfoComponent implements OnInit {

  LegalInfoForm:FormGroup;

  formData : LegalInfo;

  legalinfotype : Domaindata[];

  constructor(private fb: FormBuilder, public dialogRef : MatDialogRef<AddCustomerLegalinfoComponent>, private adminpnalService : AdminPanelMainService) { }

  ngOnInit() {
    this.LegalInfoForm=this.fb.group({
      legalinfo_type:['', [Validators.required]],
      legalinfo_value:['', [Validators.required, Validation.nonleadingspace]],
    });
    this.adminpnalService.getLegalInfoType().subscribe(
      (data) => {
        this.legalinfotype = data;
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
      legalinfo_type : form.controls.legalinfo_type.value,
      legalinfo_value : form.controls.legalinfo_value.value,
    }
    this.dialogRef.close(this.formData);
  }

}
