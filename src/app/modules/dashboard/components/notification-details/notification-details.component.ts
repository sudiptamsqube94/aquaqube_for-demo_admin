import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Notifications } from '../../model/customerDashboard';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashbordMainService } from '../../dashbord-main.service';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.scss']
})
export class NotificationDetailsComponent implements OnInit {
  notification: Notifications;
  detail: any;
  constructor(private route : ActivatedRoute,private router: Router, private spinner : NgxSpinnerService,private dashbordMainService: DashbordMainService) { }

  ngOnInit() {
    this.spinner.show()    
    this.notification = {
      node_uid : this.route.snapshot.queryParamMap.get('node_uid'),
      mac_address : this.route.snapshot.queryParamMap.get('mac_address'),
      reading : +this.route.snapshot.queryParamMap.get('reading'),
      sensor : this.route.snapshot.queryParamMap.get('sensor'),
      sensor_type : +this.route.snapshot.queryParamMap.get('sensor_type'),
      time : new Date(this.route.snapshot.queryParamMap.get('time')),
      tmax : +this.route.snapshot.queryParamMap.get('tmax'),
      tmin : +this.route.snapshot.queryParamMap.get('tmin')
    }
    this.dashbordMainService.getNotificationDetails(this.notification).subscribe(
      (data)=>{
        this.detail=data;
      },
      (error)=>{
        console.error(error);
      }
    )

  }
  goBack(){
    this.router.navigate(['/mobile-notifications']);
  }

}
