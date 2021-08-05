import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashbordMainService } from '../../dashbord-main.service';
import { Store, select } from '@ngrx/store';
import * as fromLogin from '../../../../state/app.reducer';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-mobile-dashboard-main',
  templateUrl: './mobile-dashboard-main.component.html',
  styleUrls: ['./mobile-dashboard-main.component.scss']
})
export class MobileDashboardMainComponent implements OnInit {

  customerId : number;
  constructor(private router : Router, private dashboardService : DashbordMainService, private store : Store<fromLogin.State>, private spinner : NgxSpinnerService) { }

  ngOnInit() {
    this.store.pipe(select(fromLogin.getUserDetail)).subscribe(
      userDetails => {
        if (userDetails) {
          this.customerId = userDetails.customer_id;
          this.spinner.show();
          this.dashboardService.getSummaryView(this.customerId).subscribe(
            (data) => {
              console.log(data);
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
  branch(){
    this.router.navigate(['/mobile-locations']);
  }
  device(){
    this.router.navigate(['/mobile-devices']);
  }
  notification(){
    this.router.navigate(['/mobile-notifications']);
  }
  contactUs(){
    this.router.navigate(['/mobile-contact']);
  }
  profile(){
    this.router.navigate(['/mobile-profile']);
  }

}
