import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as formLogin from '../../../../state/app.reducer';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DashbordMainService } from '../../dashbord-main.service';
import { Notifications } from '../../model/customerDashboard';
@Component({
  selector: 'app-mobile-notifications',
  templateUrl: './mobile-notifications.component.html',
  styleUrls: ['./mobile-notifications.component.scss']
})
export class MobileNotificationsComponent implements OnInit {
  customerId : number;
  notifications : Notifications[];
  notificationData: any[][];
  index: number= 0;

  constructor(private store : Store<formLogin.State>,private router : Router, private spinner : NgxSpinnerService,private dashboardService : DashbordMainService) { }

  ngOnInit() {
    setTimeout( () => this.spinner.show(), 100)
    this.notifications = [];
    this.store.pipe(select(formLogin.getUserDetail)).subscribe(
      userDetails=>{
        if(userDetails){
          this.customerId=userDetails.customer_id;
          console.log(this.customerId);
        }
      }
    );

  //get notification from inflax db
  interval(20000).pipe(
    startWith(0),
    untilDestroyed(this),
    switchMap( () => this.dashboardService.getAllNotification(this.customerId,this.index))
    ).subscribe(
      (data)=>{
        console.log(data);
        this.notifications=[];
        this.notificationData=data.results[0].series[0].values;
        
          this.notificationData.forEach(element => {
            this.notifications.push({
              customer_id : element[1],
              time : new Date(element[0]),
              mac_address: element[2],
              node_uid: element[3],
              reading: element[4],
              sensor : element[5],
              sensor_type : element[6],
              tmax : element[7],
              tmin : element[8]
            })
            this.spinner.hide()
          });

        console.log(this.notifications);
        
      },
      (error)=>{
        console.error(error);
        this.spinner.hide();
      }
    )
  }
  ngOnDestroy(){

  }
  getNotificationDetails(notification: Notifications){
    console.log(notification);
    this.router.navigate(['/mobile-devices-notification'],{queryParams: {node_uid : notification.node_uid, mac_address : notification.mac_address, reading : notification.reading
    ,sensor : notification.sensor, sensor_type : notification.sensor_type, time : notification.time, tmax : notification.tmax, tmin : notification.tmin}});
  }
  sync(){
    this.index=this.index+20;
    this.dashboardService.getAllNotification(this.customerId,this.index).subscribe(
      (data)=>{
        this.notifications=[];
        this.notificationData=data.results[0].series[0].values;
        
          this.notificationData.forEach(element => {
            this.notifications.push({
              customer_id : element[1],
              time : new Date(element[0]),
              mac_address: element[2],
              node_uid: element[3],
              reading: element[4],
              sensor : element[5],
              sensor_type : element[6],
              tmax : element[7],
              tmin : element[8]
            })
            this.spinner.hide()
          });
      },(error)=>{
        console.error(error);
      }
    )
  }

}
