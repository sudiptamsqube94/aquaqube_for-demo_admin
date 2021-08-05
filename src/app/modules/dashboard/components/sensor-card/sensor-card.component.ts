import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { MatDialogRef, MatDialog, MatRipple } from "@angular/material";
import { GraphComponent } from "../graph/graph.component";
import { DashbordMainService } from "../../dashbord-main.service";
import { SensorData } from "../../pages/dashboard-main/dashboard-main.component";
import { interval } from "rxjs";
import { startWith, switchMap } from "rxjs/operators";
import { ApplicationStateService } from "src/app/service/application-state.service";
import { untilDestroyed } from "ngx-take-until-destroy";
import { sensor } from "src/app/modules/admin-panel/model/gateway";
import { sensorData } from "../../model/customerDashboard";
import { Sensor } from "src/app/modules/admin-panel/model/customermodel";

@Component({
  selector: "app-sensor-card",
  templateUrl: "./sensor-card.component.html",
  styleUrls: ["./sensor-card.component.scss"],
})
export class SensorCardComponent implements OnInit {
  @Input() sensor: sensor;
  @Input() nodeUid: string;
  @Input() cardNo: number;
  sensorType: number;
  sensorTypes: string[] = ["Temperature", "pH", "Humidity", "Alcohol"];
  forGraphData: graphView;
  forGraphPin: any;
  graphPopup: MatDialogRef<GraphComponent>;
  formattedData: SensorData[] = [];
  graphData: any[][];
  checked: boolean = false;
  newReadding: SensorData;
  payload: any[] = [];
  currentTime: any;
  formatedData: any;
  currentReading: sensorData;
  @Output() PinValue = new EventEmitter<number>();
  @ViewChild(MatRipple, { static: false }) ripple: MatRipple;
  constructor(
    private dialog: MatDialog,
    private dashBoardService: DashbordMainService,
    private appState: ApplicationStateService
  ) {}

  ngOnInit() {
    console.log(this.sensor);
  }
  ngOnChanges() {
    this.sensorType = this.sensor.sensor_type;
    console.log(this.sensorType);
    let data1 = this.payloadFormater(this.nodeUid);
    let data2 = this.payloadFormater(String(this.sensor.sensor_type));
    this.payload[0] = data1;
    this.payload[1] = data2;
    console.log(this.payload);
    interval(20000)
      .pipe(
        startWith(0),
        untilDestroyed(this),
        switchMap(() =>
          this.dashBoardService.getNodeData({
            node_uid: this.nodeUid.toString(),
            sensor_type: +this.sensor.sensor_type,
          })
        )
      )
      .subscribe(
        (data) => {
          this.formatedData = data;
          this.currentReading = this.formatedData[0]._value;
          this.currentTime = new Date(this.formatedData[0]._time);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getSensorId(toggle: boolean, value: number) {
    //console.log(value);
    this.forGraphData = {
      sensor: this.sensor,
      nodeUid: this.nodeUid,
    };
    if (toggle == true) {
      this.sensorType = value;
      this.checked = true;
      this.graphPopup = this.dialog.open(GraphComponent, {
        //data: value.toLowerCase(),
        data: this.forGraphData,
        width: "90%",
        disableClose: true,
      });
      this.graphPopup.afterClosed().subscribe((result) => {
        if (result) {
          this.checked = false;
        }
      });
    }
  }

  pinSensorType(value: number) {
    console.log("sensor value form pin");
    this.forGraphPin = {
      sensor: this.sensor,
      nodeUid: this.nodeUid,
      value: value,
    };
    this.PinValue.emit(this.forGraphPin);
  }
  ngOnDestroy() {}
  payloadFormater(value) {
    return "'" + value + "'";
  }
}

export interface graphView {
  sensor: Sensor;
  nodeUid: string;
}
