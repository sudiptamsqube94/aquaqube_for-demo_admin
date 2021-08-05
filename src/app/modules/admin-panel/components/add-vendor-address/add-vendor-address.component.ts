import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Address, Domaindata } from '../../model/vendormodel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { Validation } from 'src/app/modules/shared/validators/validation';

@Component({
  selector: 'app-add-vendor-address',
  templateUrl: './add-vendor-address.component.html',
  styleUrls: ['./add-vendor-address.component.scss']
})
export class AddVendorAddressComponent implements OnInit {

  title: string = "Add New Address";
  addressForm: FormGroup;
  formData : Address;
  getAddressType : Domaindata[]; 
  countryCode : Domaindata[]; 
  
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddVendorAddressComponent>, private adminpnalService : AdminPanelMainService, @Inject(MAT_DIALOG_DATA) public data: Address) {
    this.formData = data;
   }

  ngOnInit() {
    this.addressForm = this.fb.group({
      add_type: '',
      add_address_line1: ['',[Validators.required, Validators.maxLength(40)]],
      add_address_line2: ['', [Validators.maxLength(40)]],
      add_city: ['',[Validators.required]],
      add_state: ['',[Validators.required]],
      add_country: ['',[Validators.required]],
      add_pin: ['',[Validators.required, Validation.pincode]],
      default_value: '',
    });

    if (this.formData) {
      this.title = "Edit Address";
      this.addressForm.patchValue(this.formData);
    }

    this.adminpnalService.getAddressType().subscribe(
      (data) => {
        this.getAddressType = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );

    this.adminpnalService.getCountryCode().subscribe(
      (data) => {
        this.countryCode = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(form) {
    if (this.formData) {
      this.formData.add_type = form.controls.add_type.value,
      this.formData.add_address_line1 = form.controls.add_address_line1.value,
      this.formData.add_address_line2 = form.controls.add_address_line2.value,
      this.formData.add_city = form.controls.add_city.value,
      this.formData.add_state = form.controls.add_state.value,
      this.formData.add_country = form.controls.add_country.value,
      this.formData.add_pin = form.controls.add_pin.value
    } 
    else {
      this.formData = {
        add_type : form.controls.add_type.value,
        add_address_line1 : form.controls.add_address_line1.value,
        add_address_line2 : form.controls.add_address_line2.value,
        add_city : form.controls.add_city.value,
        add_state : form.controls.add_state.value,
        add_country : form.controls.add_country.value,
        add_pin : form.controls.add_pin.value,
      }
    }
    console.log(this.formData);
    this.dialogRef.close(this.formData);
  }
}
