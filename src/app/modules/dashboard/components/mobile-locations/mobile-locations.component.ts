import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromLogin from '../../../../state/app.reducer';
import { DashbordMainService } from '../../dashbord-main.service';
import { Branch } from 'src/app/modules/admin-panel/model/customermodel';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-mobile-locations',
  templateUrl: './mobile-locations.component.html',
  styleUrls: ['./mobile-locations.component.scss']
})
export class MobileLocationsComponent implements OnInit {

  customerId : number;
  branches : Branch[];
  constructor(private store : Store<fromLogin.State>, private dashboardService : DashbordMainService, private router : Router, private spinner : NgxSpinnerService) { }

  ngOnInit() {
    this.store.pipe(select(fromLogin.getUserDetail)).subscribe(
      userDetails => {
        if (userDetails) {
          console.log(userDetails);
          this.customerId = userDetails.customer_id;
          this.spinner.show()
          this.dashboardService.getCustomerBranch(this.customerId).subscribe(
            (data) => {
              console.log(data);
              this.branches = data
              this.spinner.hide()
            },
            (error) => {
              console.log(error);
              this.spinner.hide();
            }
          );
        }
      }
    );
  }

  getBranch(branch : Branch){
    console.log(branch);
    this.router.navigate(['/mobile-devices-branches'], {queryParams: {branch_id : branch.branch_id}})
  }

}

