import { Component, OnInit } from "@angular/core";
import { DashbordMainService } from "../../dashbord-main.service";
import { CustomerDashBoard } from "../../model/customerDashboard";
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialogRef, MatDialog } from "@angular/material";
import { VideoWindowComponent } from "../../components/video-window/video-window.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard-main",
  templateUrl: "./dashboard-main.component.html",
  styleUrls: ["./dashboard-main.component.scss"],
})
export class DashboardMainComponent implements OnInit {
  currentReading: SensorData;

  customerAssignData: CustomerDashBoard[];

  sensorValue: any[];

  deviceName: string;

  deviceData: CustomerDashBoard;
  DeviceList: any;
  SensorList: any;
  //deviceType and MAC from output
  sensorType: string;
  deviceMac: string;

  //dialogRef
  videoDialogRef: MatDialogRef<VideoWindowComponent>;

  constructor(
    private dashbordmainService: DashbordMainService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.dashbordmainService.getCustomerAssignData(15).subscribe(
      (data) => {
        console.log(data);
        this.customerAssignData = data;
        setTimeout(() => {
          this.spinner.hide();
        }, 3000);
        // this.spinner.hide()
      },
      (error) => {
        console.error(error);
        this.spinner.hide();
      }
    );
  }

  ShowReading(data: SensorData) {
    this.currentReading = data;
  }

  getDeviceId(id: number) {
    this.dashbordmainService.getSensorData(id).subscribe(
      (data) => {
        this.spinner.show();
        console.log(data[0].sensors);
        this.sensorValue = data[0].sensors;
        this.deviceName = data[0].device_name;
        setTimeout(() => {
          this.spinner.hide();
        }, 3000);
        //console.log("sensor value form main:  "+this.sensorValue);
      },
      (error) => {
        console.error(error);
        this.spinner.hide();
      }
    );
    // console.log('from dashboard main ' + id)
  }

  getDeviceData(value: CustomerDashBoard) {
    this.deviceData = value;
  }

  getType(value) {
    this.sensorType = value;
    this.sensorType = this.sensorType.toLowerCase();
    console.log(this.sensorType);
  }
  getMac(value) {
    console.log("this is form main: ");
    console.log(value);
    this.deviceMac = value;
  }
  openVideo(value: number) {
    switch (value) {
      case 1:
        this.videoDialogRef = this.dialog.open(VideoWindowComponent);
        break;
    }
  }

  sensorDetails(value) {
    console.log("form main: ");
    console.log(value);
  }

  getDeviceList(value: any) {
    this.DeviceList = value;
  }

  getSensorData(value: any) {
    this.SensorList = value;
  }
  mapview() {
    this.router.navigate(["map-view"]);
  }
  home(){
    this.router.navigate(['admin-panel'])
  }
}

export interface SensorData {
  name: Date;
  value: number;
}

