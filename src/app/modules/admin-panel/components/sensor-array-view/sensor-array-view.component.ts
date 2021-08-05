import { Component, OnInit, Input } from '@angular/core';
import { node, sensor } from '../../model/gateway';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-sensor-array-view',
  templateUrl: './sensor-array-view.component.html',
  styleUrls: ['./sensor-array-view.component.scss']
})
export class SensorArrayViewComponent implements OnInit {

  @Input() node : node = null
  sensors : sensor[];
  dataSource = new MatTableDataSource<sensor>()
  displayedCloumns : string[] = [ 'sensor_type', 'sensor_model', 'sensor_make', 'sensor_status', 'sensor_threshold_max', 'sensor_threshold_min']
  constructor() { }

  ngOnInit() {
    this.sensors = [];
    if (this.node) {
      this.sensors = this.node.sensors
      this.dataSource.data = this.sensors
    }else{
      this.sensors = []
    }
  }

  ngOnChanges() {
    this.sensors = [];
    if (this.node && this.node.sensors.length > 0) {
      this.sensors = this.node.sensors;
      this.dataSource.data = this.sensors
    }else{
      this.dataSource.data = this.sensors
    }
  }

}
