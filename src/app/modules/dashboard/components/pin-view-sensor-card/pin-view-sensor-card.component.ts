import { Component, OnInit, Input } from '@angular/core';
import { SensorData } from '../../pages/dashboard-main/dashboard-main.component';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DashbordMainService } from '../../dashbord-main.service';

@Component({
  selector: 'app-pin-view-sensor-card',
  templateUrl: './pin-view-sensor-card.component.html',
  styleUrls: ['./pin-view-sensor-card.component.scss']
})
export class PinViewSensorCardComponent implements OnInit {

  @Input() sensor: string;
  graphData: any[][];
  formattedData: SensorData[] = [];
  single: any[];
  multi: any[];
  view: any[] = [900, 200];
  minDate = new Date(2019, 7, 27, 20); //2019, 7, 27, 20
  maxDate = new Date(); //2019, 7, 27, 21
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
  yScaleMin = 20;
  yScaleMax = 40;  
  colorScheme = {
    domain: ['#F6A74B', '#A10A28', '#C7B42C', '#AAAAAA']
  };
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
  showRefLines = true;
  showRefLabels = true;
  
  constructor(private dashBoardService:DashbordMainService) { }

  ngOnInit() {
    console.log(this.sensor);

    if (this.sensor) {
      interval(20000).pipe(
        startWith(0),
        untilDestroyed(this),
        switchMap(()=> this.dashBoardService.getGraphData(this.sensor))
      ).subscribe(
        (data) =>{
          this.formattedData = [];
          this.graphData = data.results[0].series[0].values;
          this.graphData.forEach( element =>{
            this.formattedData.push({
              name: new Date(element[0]),
              value: element[element.length - 2]
            });
          });

          this.single = [
            {
              name: this.sensor,
              series: this.formattedData
            }
          ]
        },
        (error) =>{
          console.log(error)
        }
      );
    }
  }
  onSelect(event) {
    console.log(event);

  }
  ngOnDestroy() {

  }
}
