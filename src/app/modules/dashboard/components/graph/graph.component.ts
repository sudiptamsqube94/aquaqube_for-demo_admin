import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  Inject,
} from "@angular/core";
import { DashbordMainService } from "../../dashbord-main.service";
import { interval } from "rxjs";
import { startWith, switchMap } from "rxjs/operators";
import { SensorData } from "./../../pages/dashboard-main/dashboard-main.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { untilDestroyed } from "ngx-take-until-destroy";
import { graphView } from "../sensor-card/sensor-card.component";
@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.scss"],
})
export class GraphComponent implements OnInit {
  @Output() NewReading = new EventEmitter<SensorData>();
  newReading: any;
  sensorType: number;
  sensorName: string;
  sensorValue: any;
  payload: any[] = [];
  @Input() type: string;

  payloadForGraph: any;
  constructor(
    private dashBoardService: DashbordMainService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<GraphComponent>
  ) {
    //this.sensorType = data.;
    console.log("form graph component:  ");
    console.log(data);
    this.payloadForGraph = data;
    this.sensorType = this.payloadForGraph.sensor.sensor_type;
    this.sensorName = this.payloadForGraph.sensor.sensor_model;
  }

  graphData: any[] = [];
  formattedData: any[] = [];
  single: any[];
  multi: any[];
  view: any[] = [900, 200];
  //2019, 7, 27, 20
  //2019, 7, 27, 21
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  legendPosition = "below";
  xAxisLabel = "timestamp";
  showYAxisLabel = true;
  yAxisLabel = "value";
  maxXAxisTickLength = 16;
  trimXAxisTicks = true;
  autoScale = true;
  roundDomains = true;
  _12hrsinms = 43200000;
  _6hrsinms = 21600000;
  maxDate = new Date();
  diff: any = <any>this.maxDate - this._6hrsinms;
  minDate = new Date(this.diff);
  xScaleMax = this.maxDate;
  xScaleMin = this.minDate;
  //temperature y scale
  yScaleMin = null;
  // yScaleMax = 28;
  // //humidity y scale
  yScaleMinHumidity = null;
  // yScaleMaxHumidity = 100;

  //alcohol y scale
  yScaleMinAlcohol = null;
  // yScaleMaxAlcohol = 5;

  referenceLines = [
    {
      name: "minimum",
      value: -5,
    },
    {
      name: "maximum",
      value: 10,
    },
  ];
  //reference lines
  referenceLinesHumidity = [
    {
      name: "minimum",
      value: 40,
    },
    {
      name: "maximum",
      value: 80,
    },
  ];
  referenceLinesPh = [
    {
      name: "minimum",
      value: 1,
    },
    {
      name: "maximum",
      value: 15,
    },
  ];
  referenceLinesDo = [
    {
      name: "minimum",
      value: 1,
    },
    {
      name: "maximum",
      value: 15,
    },
  ];

  //reference line
  referenceLinesAlcohol = [
    {
      name: "minimum",
      value: 1,
    },
    {
      name: "maximun",
      value: 2,
    },
  ];
  showRefLines = true;
  showRefLabels = true;

  colorScheme = {
    domain: ["#F6A74B", "#A10A28", "#C7B42C", "#AAAAAA"],
  };
  //colorScheme for humidity
  colorScheme2 = {
    domain: ["#F6A74B", "#A10A28", "#C7B42C", "#AAAAAA"],
  };
  //colorScheme for humidity
  colorScheme3 = {
    domain: ["#F6A74B", "#A10A28", "#C7B42C", "#AAAAAA"],
  };
  ngOnInit() {
    let data1 = this.payloadFormater(this.payloadForGraph.nodeUid);
    let data2 = this.payloadFormater(
      String(this.payloadForGraph.sensor.sensor_type)
    );
    this.payload[0] = data1;
    this.payload[1] = data2;
    console.log(this.payload);
    if (this.payloadForGraph.sensor.sensor_type) {
      interval(20000)
        .pipe(
          startWith(0),
          untilDestroyed(this),
          switchMap(() =>
            this.dashBoardService.getNodeData({
              node_uid: this.payloadForGraph.nodeUid.toString(),
              sensor_type: +this.payloadForGraph.sensor.sensor_type,
            })
          )
        )
        .subscribe(
          (data) => {
            console.log(data);
            this.formattedData = [];
            this.graphData = data;
            this.graphData.forEach((element) => {
              this.formattedData.push({
                name: new Date(element._time),
                value: element._value,
              });
              console.log(this.formattedData);
            });

            this.single = [
              {
                name: this.payloadForGraph.sensor.sensor_model,
                series: this.formattedData,
              },
            ];

            this.NewReading.emit(
              this.formattedData[this.formattedData.length - 1]
            );
            this.newReading = this.formattedData[this.formattedData.length - 1];
          },
          (error) => {
            console.log(error);
          }
        );
    }

    console.log(this.type);
  }

  onSelect(event) {
    console.log(event);
  }

  setYMinTemperature() {
    this.yScaleMin = -5;
  }
  setYMinAlcohol() {
    this.yScaleMinAlcohol = 1;
  }
  setYMinHumid() {
    this.yScaleMinHumidity = 30;
  }

  CancelOperation() {
    this.dialogRef.close("result");
  }

  ngOnDestroy() {}
  payloadFormater(value) {
    return "'" + value + "'";
  }
}
