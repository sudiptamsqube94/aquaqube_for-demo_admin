import { Component, OnInit, Input } from '@angular/core';
import { sensor } from 'src/app/modules/admin-panel/model/gateway';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DashbordMainService } from '../../dashbord-main.service';
import { sensorData } from '../../model/customerDashboard';

@Component({
  selector: 'app-graph-mobile',
  templateUrl: './graph-mobile.component.html',
  styleUrls: ['./graph-mobile.component.scss']
})
export class GraphMobileComponent implements OnInit {
  @Input() sensor_model : any;
  @Input() sensor_Type: any;
  @Input() node_uid;
  @Input() threshold;
  payload : any[] = [];
  formatedData : sensorData[] = [];
  formattedMax : any [] = [];
  formattedMin : any [] = [];
  graphData : any[][];
  single: any[];
  multi: any[];
  view: any[] = [600, 300];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
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
  sensorMax;
  sensorMin;
  colorScheme = {
    domain: ['#e6005c', '#A10A28', '#00805e', '#AAAAAA']
  };
  referenceLines = [];
  constructor(private dashboardService : DashbordMainService) { }
    ngOnInit() {
      console.log(this.maxDate);
      console.log(this.minDate);
      console.log('from inputtttttttttt.....',this.threshold);
    let data1 = this.payloadFormater(String(this.node_uid)); 
    let data2 = this.payloadFormater(String(this.sensor_Type));
    this.payload[0] = data1;
    this.payload[1] = data2;
    
    interval(20000).pipe(
      startWith(0),
      untilDestroyed(this),
      switchMap( () => this.dashboardService.getNodeDatas(this.payload))
    ).subscribe(
      (data) => {
        console.log('graph dataaaaaaaaaaaaa...........',data);
        this.formatedData = [];
        this.graphData = data.results[0].series[0].values;
        console.log('graph dataxxxxxxxxxxxxxxxxxxxxxxxxxx',this.graphData);
        this.graphData.forEach( element => {
          this.formatedData.push({
            name: new Date(element[0]),
            value : element[element.length - 3]
          })
          this.formattedMax.push({
            name: new Date(element[0]),
            value : this.sensorMax
          })
          this.formattedMin.push({
            name : new Date(element[0]),
            value : this.sensorMin
          })
        });
        this.single = [{
          name: this.sensor_model,
          series: this.formatedData
        }];
        this.multi = [
          {
            name : this.sensor_model,
            series : this.formatedData
          },
          {
            name : "Threshold Max",
            series : this.formattedMax
          },
          {
            name : "Threshold Min",
            series : this.formattedMin
          }
        ]
        console.log(this.single);
        console.log(this.formatedData);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ngOnDestroy(){

  }
  ngOnChanges(){
    // console.log(this.threshold);
    // console.log(this.sensor_Type);
    // console.log(this.referenceLines);
    console.log('sensor typeeeeeeeeeeeeee',this.threshold.DO[0]);
    if (this.sensor_Type == "3") {
      this.sensorMax = this.threshold.DO[0]["T.Max"];
      this.sensorMin = this.threshold.DO[0]["T.Min"];
    }else if (this.sensor_Type == "1"){
      this.sensorMax = this.threshold.TEMP[0]["T.Max"];
      this.sensorMin = this.threshold.TEMP[0]["T.Min"];
    }else if (this.sensor_Type == "2"){
      this.sensorMax = this.threshold.PH[0]["T.Max"];
      this.sensorMin = this.threshold.PH[0]["T.Min"];
    }
  }
  payloadFormater(value){
    return "'"+value+"'"
  }
}
