import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { node, sensor } from '../../model/gateway';
import { MatTableDataSource } from '@angular/material';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-node-table',
  templateUrl: './node-table.component.html',
  styleUrls: ['./node-table.component.scss']
})
export class NodeTableComponent implements OnInit {
  @Input() nodes : node[]; 
  @Output() buttonClicked = new EventEmitter<number>();
  @Output() nodeData = new EventEmitter<sensor>();
  dataSource = new MatTableDataSource<node>();
  displayedColumns : string[] = ['select', 'uid', 'data_collection_frequency', 'data_sending_frequency', 'status'];
  selectedNode : node = {
    node_id : 0
  }
  constructor(private adminPanelService: AdminPanelMainService, private spinner : NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show()
    this.adminPanelService.getAllnodes().subscribe(
      (data) => {
        console.log(data);
        this.dataSource.data = data
        this.spinner.hide()
      },
      (error) => {
        console.error(error);
      }
    ); 
  }

  ngOnChanges() {
    this.dataSource.data = this.nodes
  }
  applyFilter(value : string){
    this.dataSource.filter = value.trim().toLowerCase();
  }
  InitializeClick(value: number){
    this.buttonClicked.emit(value);
  }
  viewNode(value){
    console.log(value)
    this.nodeData.emit(value);
  }
}
