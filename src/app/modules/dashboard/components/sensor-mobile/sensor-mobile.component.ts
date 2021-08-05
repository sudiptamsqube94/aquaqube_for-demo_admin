import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { sensor } from 'src/app/modules/admin-panel/model/gateway';
import { interval, Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DashbordMainService } from '../../dashbord-main.service';
import { sensorData } from '../../model/customerDashboard';
import { MatRipple } from '@angular/material';
import { id } from '@swimlane/ngx-charts/release/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sensor-mobile',
  templateUrl: './sensor-mobile.component.html',
  styleUrls: ['./sensor-mobile.component.scss']
})
export class SensorMobileComponent implements OnInit {
  @Input() sensor : sensor;
  @Input() nodeUid : string;
  @Input() autoRefresh: boolean;
  @Input() branch_id: any;
  sensorType:any;
  payload : any[] = [];
  formatedData : any;
  currentReading : sensorData;
  currentTime: any;
  maxValue: any;
  minValue: any;
  @ViewChild(MatRipple, {static: false}) ripple : MatRipple;
  constructor(private dashboardService : DashbordMainService,private router : Router) { }

  ngOnInit() {
    this.sensorType=this.sensor.sensor_type;
    console.log("sensor type",this.sensorType);
    let data1 = this.payloadFormater(this.nodeUid); 
    let data2 = this.payloadFormater(String(this.sensor.sensor_type));
    this.payload[0] = data1;
    this.payload[1] = data2
    console.log(this.payload);
    this.maxValue = this.sensor.sensor_threshold_max;
    this.minValue = this.sensor.sensor_threshold_min;
    interval(20000).pipe(
      startWith(0),
      untilDestroyed(this),
      switchMap(() => {
        if(this.autoRefresh){
          return this.dashboardService.getNodeData(this.payload)
        }
        else {
          return new Observable<any>();
        }
      })
    ).subscribe(
      (data) => {
        if(data) {
          this.formatedData = data.results[0].series[0].values[0];
          this.currentReading = this.formatedData[1];
          this.currentTime = new Date(this.formatedData[0]);
          console.log("current",this.currentReading,"sensor type",this.sensorType,"node id",this.nodeUid);
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  
  ngOnDestroy(){

  }
  payloadFormater(value){
    return "'"+value+"'"
  }
  goToGraph(){
    if(this.branch_id){
      this.router.navigate(['/mobile-graphs'], {queryParams : {node_id : this.nodeUid, sensor_Type : this.sensor.sensor_type, sensor_model: this.sensor.sensor_model, branch_id: this.branch_id}});
    }
    else{
      this.router.navigate(['/mobile-graphs'], {queryParams : {node_id : this.nodeUid, sensor_Type : this.sensor.sensor_type, sensor_model: this.sensor.sensor_model}});
    }
  }
}
