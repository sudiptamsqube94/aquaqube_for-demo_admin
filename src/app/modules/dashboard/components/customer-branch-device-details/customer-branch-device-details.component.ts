import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SensorData } from '../../pages/dashboard-main/dashboard-main.component';
import { CustomerDashBoard } from '../../model/customerDashboard';
import { Router } from '@angular/router';
import { ApplicationStateService } from 'src/app/service/application-state.service';
import { sensor } from 'src/app/modules/admin-panel/model/gateway';
import { Sensor } from 'src/app/modules/admin-panel/model/customermodel';
import { element } from 'protractor';

@Component({
  selector: 'app-customer-branch-device-details',
  templateUrl: './customer-branch-device-details.component.html',
  styleUrls: ['./customer-branch-device-details.component.scss']
})
export class CustomerBranchDeviceDetailsComponent implements OnInit {

  @Input() CurrentReading: SensorData;
  @Input() nodeList: any;
  @Input() sensordata : any[];
  @Input() deviceName : string;
  @Input() deviceData : CustomerDashBoard;
  @Input() deviceMac: string;
  @Output() videoClicked = new EventEmitter<number>();
  @Output() EmitSenseorValue = new EventEmitter();
  listOfPinValue: string[] = [];
  pinValueSet = new Set();
  selectable = true;
  removable = true;
  sensors : sensor[];
  graphPin : graphView[];
  // @Output() sensorType = new EventEmitter<string>();
  // @Output() deviceMac = new EventEmitter<string>();
  // temp: string = "";
  // humidity: string = "";
  // alcohol: string = "";
  // time: Date = null;
  // time2: Date = null;
  // time3: Date = null;
  // color= 'accent';
  
  //sensor type
  type: string = "";
  reading1: string = "";
  constructor(private router: Router, private appState: ApplicationStateService) { }

  ngOnInit() {
    this.graphPin = []
  }

  ngOnChanges() {
    this.graphPin = [];
    this.pinValueSet.clear();
    // console.log(this.type)
    // if (this.CurrentReading) {
    //   if (this.type == 'temperature') {
    //     this.temp = this.CurrentReading.value.toString();
    //     this.time = this.CurrentReading.name;
    //   } else if (this.type == 'humidity'){
    //     this.humidity = this.CurrentReading.value.toString();
    //     this.time = this.CurrentReading.name;
    //   }else{
    //     this.alcohol = this.CurrentReading.value.toString();
    //     this.time = this.CurrentReading.name;
    //   }
    // }
    console.log("this is form customer branch device details");
    console.log(this.nodeList);
    this.sensors = this.nodeList.sensor;
    console.log("List of pin value:  ");
    //console.log(this.listOfPinValue);
  }

  getSensorId(value, sensorType : string) {
    // console.log(value)
    // if (value.checked) {
    //   this.type = sensorType;
    //   this.type = this.type.toLowerCase();
    //   this.sensorType.emit(sensorType);
    //   this.deviceMac.emit(this.deviceData.device_mac);
    // } else {
    //   this.sensorType.emit(null);
    //   this.temp =  "";
    //   this.time = null;
    // }
    
  }
  change(value){
    console.log(value)
  }
  openVideo(){
    this.videoClicked.emit(1);
  }

  pinValue(value){
    let flag: Boolean=true;
    console.log("value",value);
    this.pinValueSet.add(value.value);
    console.log(this.pinValueSet);
    if(this.graphPin.length==0){
      this.graphPin.push({
        nodeUid: value.nodeUid,
        sensor: value.sensor
      })
    }
    this.graphPin.forEach(element=>{
      if(element.sensor.sensor_type==value.value){
       flag=false;
      }
    })
    if(flag){
      this.graphPin.push({
        nodeUid: value.nodeUid,
        sensor: value.sensor
      })
    }
    console.log("graph pin",this.graphPin);
  }

  remove(value)  {
    this.pinValueSet.delete(value);
    for(let i=0;i<this.graphPin.length;i++){
      if(this.graphPin[i].sensor.sensor_type==value){
        this.graphPin.splice(i,1);
        console.log("delete",i);
      }
    }
    console.log(this.graphPin);
  }

  viewAllSensorvalue() {
    //console.log(value);
    this.router.navigate(['/allGraph']);
    this.appState.pinnedSensors = this.graphPin;
  }
}
export interface graphView{
  sensor : Sensor;
  nodeUid : string;
}
