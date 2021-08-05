import { Component, OnInit, Input } from '@angular/core';
import { SensorData } from '../../pages/dashboard-main/dashboard-main.component';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DashbordMainService } from '../../dashbord-main.service';

@Component({
  selector: 'app-all-pin-graph',
  templateUrl: './all-pin-graph.component.html',
  styleUrls: ['./all-pin-graph.component.scss']
})
export class AllPinGraphComponent implements OnInit {

  @Input() sensor: string;
  newReading: any;
  // sensorType: string;
  sensorValue: any;
  graphData: any[][];
  formattedData: SensorData[] = [];
  single: any[];
  multi: any[];
  view: any[] = [900, 200];
  minDate = new Date(2019, 7, 27, 20); //2019, 7, 27, 20
  maxDate = new Date(); //2019, 7, 27, 21
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
      value: 40
    },
    {
      name: "maximum",
      value: 80
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
  showRefLines = true;
  showRefLabels = true;

  colorScheme = {
    domain: ['#F6A74B', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  //colorScheme for humidity
  colorScheme2 = {
    domain: ['#AD79B4']
  } 
  //colorScheme for humidity
  colorScheme3 = {
    domain: ['#94B966']
  }
  constructor(private dashBoardService: DashbordMainService) { }

  ngOnInit() {

    if (this.sensor) {
      interval(20000)
      .pipe(
        startWith(0),
        untilDestroyed(this),
        switchMap(() => this.dashBoardService.getGraphData(this.sensor))
      ).subscribe(
        (data) => {
          console.log(data);
          this.formattedData = [];
          this.graphData = data.results[0].series[0].values;
          this.graphData.forEach(element => {
            this.formattedData.push({
              name: new Date(element[0]),
              value: element[element.length - 2]
            });
            // console.log(this.formattedData)
          });

          this.single = [{
            name: this.sensorValue.sensor_name,
            series: this.formattedData
          }];

          //this.NewReading.emit(this.formattedData[this.formattedData.length - 1]);
          this.newReading = this.formattedData[this.formattedData.length - 1];
        },
        (error) => {
          console.log(error);
        }
      ) 
    }
  }

  onSelect(event) {
    console.log(event);

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

  ngOnDestroy() {

  }

}
