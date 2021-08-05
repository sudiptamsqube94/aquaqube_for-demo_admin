import { Component, OnInit, Input } from '@angular/core';
import { node } from '../../admin-panel/model/gateway';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DashbordMainService } from '../dashbord-main.service';
import { sensorData } from '../model/customerDashboard';
import { element } from 'protractor';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {
  @Input() node : node
  @Input() gateway :string;
  @Input() autoRefresh: boolean;
  @Input() branch_id: any;
  node_uid: string ;
  formatedData : sensorData[] = [];
  graphData : any[][];
  constructor(private dashboardMainService : DashbordMainService) { }

  ngOnInit() {
    console.log(this.node.uid);
    // this.node_uid = this.node.uid;
    // interval(20000)
      // .pipe(
        // startWith(0),
        // untilDestroyed(this),
        // switchMap( () => this.dashboardMainService.getNodeData(this.node_uid))
      // ).subscribe(
        // (data) => {
          // this.formatedData = [];
          // this.graphData = data.results[0].series[0].values;
          // this.graphData.forEach( element => {
            // console.log(element[0])
            // this.formatedData.push({
              // name:new Date(element[0]),
              // value: element[element.length - 2]
            // })
          // })
          // console.log(this.formatedData);
        // },
        // (error) => {
          // console.log(error);
        // }
      // );
  }

  ngOnDestroy(){

  }
}
