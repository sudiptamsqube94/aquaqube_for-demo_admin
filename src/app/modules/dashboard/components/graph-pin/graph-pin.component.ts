import { Component, OnInit, Input } from '@angular/core';
import { DashbordMainService } from '../../dashbord-main.service';
import { SensorData } from '../../pages/dashboard-main/dashboard-main.component';
import { startWith, switchMap } from 'rxjs/operators';
import { interval } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-graph-pin',
  templateUrl: './graph-pin.component.html',
  styleUrls: ['./graph-pin.component.scss']
})
export class GraphPinComponent implements OnInit {
  newReading: any;
  sensorType: number;
  sensorName : string;
  sensorValue: any;
  payload : any[] = [];
  payloadForGraph : any;
  @Input() graph: any;
  constructor(private dashBoardService: DashbordMainService) { 
  }
  graphData: any[][];
  formattedData: SensorData[] = [];
  single: any[];
  multi: any[];
  view: any[] = [900, 200];
  // minDate = new Date(2019, 7, 27, 20); //2019, 7, 27, 20
  // maxDate = new Date(); //2019, 7, 27, 21
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  legendPosition = "below"
  xAxisLabel = 'timestamp';
  showYAxisLabel = true;
  yAxisLabel = 'value';
  maxXAxisTickLength = 16;
  trimXAxisTicks = true;
  autoScale = true;
  roundDomains = true;
  _12hrsinms = 43200000;
  _6hrsinms = 21600000;
  maxDate = new Date();
  diff : any = <any>this.maxDate - this._6hrsinms;
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
      value: -5
    },
    {
      name: "maximum",
      value: 10
    }
  ]
  //reference lines
  referenceLinesHumidity = [
    {
      name: "minimum",
      value: 70
    },
    {
      name: "maximum",
      value: 10
    }
  ]
  //reference line
  referenceLinesAlcohol = [
    {
      name: "minimum",
      value: 1
    },
    {
      name: "maximun",
      value: 2
    }
  ]
  referenceLinesPh = [
    {
      name: "minimum",
      value: 1
    },
    {
      name: "maximum",
      value: 10
    }
  ]
  referenceLinesDo = [
    {
      name: "minimum",
      value: 1
    },
    {
      name: "maximum",
      value: 10
    }
  ]
  showRefLines = true;
  showRefLabels = true;

  colorScheme = {
    domain: ['#F6A74B', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  //colorScheme for humidity
  colorScheme2 = {
    domain: ['#F6A74B', '#A10A28', '#C7B42C', '#AAAAAA']
  } 
  //colorScheme for humidity
  colorScheme3 = {
    domain: ['#F6A74B', '#A10A28', '#C7B42C', '#AAAAAA']
  }
  ngOnInit() {
    console.log(this.graph);
    this.payloadForGraph = this.graph;
    this.sensorType = this.payloadForGraph.sensor.sensor_type;
    this.sensorName = this.payloadForGraph.sensor.sensor_model;
    let data1 = this.payloadFormater(this.payloadForGraph.nodeUid); 
    let data2 = this.payloadFormater(String(this.payloadForGraph.sensor.sensor_type));
    this.payload[0] = data1;
    this.payload[1] = data2
    console.log(this.payload);
    if (this.payloadForGraph.sensor.sensor_type) {
      interval(20000)
      .pipe(
        startWith(0),
        untilDestroyed(this),
        switchMap(() => this.dashBoardService.getNodeDatas(this.payload))
      ).subscribe(
        (data) => {
          console.log(data);
          this.formattedData = [];
          this.graphData = data.results[0].series[0].values;
          this.graphData.forEach(element => {
            this.formattedData.push({
              name: new Date(element[0]),
              value: element[element.length - 3]
            });
            console.log(this.formattedData)
          });

          this.single = [{
            name: this.payloadForGraph.sensor.sensor_model,
            series: this.formattedData
          }];
          this.newReading = this.formattedData[this.formattedData.length - 1];
        },
        (error) => {
          console.log(error);
        }
      ) 
    }

  }
  payloadFormater(value){
    return "'"+value+"'"
  }
  setYMinTemperature(){
    this.yScaleMin = -5;
  }
  setYMinAlcohol(){
    this.yScaleMinAlcohol = 1;
  }
  setYMinHumid(){
    this.yScaleMinHumidity = 30;
  }
  onSelect(event) {
    console.log(event);

  }
  ngOnDestroy() {

  }
}
