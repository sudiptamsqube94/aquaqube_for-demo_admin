import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DashbordMainService } from '../../dashbord-main.service';
import { sensorData } from '../../model/customerDashboard';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-sensor-data-history',
  templateUrl: './sensor-data-history.component.html',
  styleUrls: ['./sensor-data-history.component.scss']
})
export class SensorDataHistoryComponent implements OnInit {
  @Input() sensor_model : any;
  @Input() sensor_Type: any;
  @Input() node_uid;
  payload : any[] = [];
  fromData: any;
  formatedData : sensorData[] = [];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: string[] = ['time', 'value'];
  dataSource = new MatTableDataSource<any>();
  constructor(private dashboardService : DashbordMainService) { }

  ngOnInit() {
    let data1 = this.payloadFormater(this.node_uid); 
    let data2 = this.payloadFormater(String(this.sensor_Type));
    this.payload[0] = data1;
    this.payload[1] = data2;
    this.dashboardService.getNodeDatas(this.payload).subscribe(
      (data)=>{
        this.formatedData = [];
        this.fromData = data.results[0].series[0].values;
        this.fromData.forEach( element => {
          this.formatedData.push({
            name: new Date(element[0]),
            value : element[element.length - 3]
          })
        });
        this.dataSource.data=this.formatedData.reverse();
        // console.log(this.formatedData);
        
      },(error)=>{
        console.error(error);
      }
    )
  }
  payloadFormater(value){
    return "'"+value+"'"
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
