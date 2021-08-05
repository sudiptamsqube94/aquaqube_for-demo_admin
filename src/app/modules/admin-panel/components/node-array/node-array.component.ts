import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { node } from '../../model/gateway';

@Component({
  selector: 'app-node-array',
  templateUrl: './node-array.component.html',
  styleUrls: ['./node-array.component.scss']
})
export class NodeArrayComponent implements OnInit {
  @Output() selected = new EventEmitter<node>();
  @Input() nodes : node[] = []; 
  dataSource = new MatTableDataSource<node>();
  displayedColumns : string[] = ['select', 'uid', 'data_collection_frequency', 'data_sending_frequency', 'status'];
  selectedNode : node = {
    node_id : 0
  };
  constructor() { }

  ngOnInit() {
    this.nodes = [];
    if (this.nodes.length > 0) {
      this.dataSource.data = this.nodes;
    }
  }

  ngOnChanges() {
    if (this.nodes.length > 0) {
      this.dataSource.data = this.nodes;  
    }
  }
  viewNode(value : node){
    console.log(value);
    this.selected.emit(value);
  }

}
