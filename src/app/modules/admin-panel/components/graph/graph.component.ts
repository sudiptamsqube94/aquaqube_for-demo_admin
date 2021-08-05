import { Component, OnInit } from '@angular/core';
import { AdminPanelMainService } from '../../admin-panel-main.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  query: string = "";
  constructor(private adminService : AdminPanelMainService) { }

  ngOnInit() {

    // this.adminService.getGraphData().subscribe(
    //   (data) => {
    //     console.log(data);
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );

  }

}
