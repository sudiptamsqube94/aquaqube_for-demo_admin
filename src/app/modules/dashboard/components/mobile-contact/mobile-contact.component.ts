import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import{DashbordMainService} from '../../dashbord-main.service';
import * as formLogin from '../../../../state/app.reducer';
import { customerSupport } from '../../model/customerDashboard';
import { MatSnackBar } from '@angular/material';
import { SuccessSnackberComponent } from 'src/app/modules/shared/components/success-snackber/success-snackber.component';
@Component({
  selector: 'app-mobile-contact',
  templateUrl: './mobile-contact.component.html',
  styleUrls: ['./mobile-contact.component.scss']
})
export class MobileContactComponent implements OnInit {
  contactForm:FormGroup;
  customerId : number;
  CustomerNode: any
  newSupport : customerSupport;
  constructor(private fb: FormBuilder, private store : Store<formLogin.State>, private dashbordMainService: DashbordMainService,private _snackBar: MatSnackBar) {  }

  ngOnInit() {
    this.contactForm=this.fb.group({
      Name:[''],
      Email:[''],
      Message:[''],
      Node:['']
    })
    this.store.pipe(select(formLogin.getUserDetail)).subscribe(
      userDetail => {
        if (userDetail) {
          console.log(userDetail);
          this.customerId = userDetail.customer_id;
          this.dashbordMainService.getCustomerNode(this.customerId).subscribe(
            (data)=>{
              this.CustomerNode=data;
            },
            (error)=>{
              console.log(error);
            }
          )
          
        }
      }
    );
    
  }
  OnSubmit(form){
    this.newSupport = {
      customer_id : this.customerId,
      node_id : form.controls.Node.value,
      details : form.controls.Message.value
    }
    console.log(this.newSupport);
    this.dashbordMainService.postSupport(this.newSupport).subscribe(
      (data) => {
        if(data == "001") {
            this._snackBar.openFromComponent(SuccessSnackberComponent,{data: "Successfully Submit", duration: 3000});
            this.contactForm.reset();
        }
      },
      (error) => {
        console.error(error);
      }
    );
    
  }

}
