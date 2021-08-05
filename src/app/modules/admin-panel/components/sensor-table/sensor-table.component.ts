import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { sensor } from '../../model/gateway';
import { MatTableDataSource } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sensor-table',
  templateUrl: './sensor-table.component.html',
  styleUrls: ['./sensor-table.component.scss']
})
export class SensorTableComponent implements OnInit {
  @Input() sensors : sensor[];
  @Output() buttonClicked = new EventEmitter<number>();
  @Output() sensorData = new EventEmitter<sensor>();
  dataSource = new MatTableDataSource<sensor>()
  selectedSensor : sensor = {
    sensor_id : 0
  }
  displayedCloumns : string[] = ['select', 'sensor_type', 'sensor_model', 'sensor_make', 'sensor_status', 'sensor_threshold_max', 'sensor_threshold_min']
  constructor(private adminPanelService: AdminPanelMainService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.adminPanelService.getAllSensor().subscribe(
      (data) => {
        console.log(data)
        this.dataSource.data = data;
        this.spinner.hide()
      },
      (error) => {
        console.error(error);
        this.spinner.hide()
      }
    );
  }
  ngOnChanges(){
    this.dataSource.data = this.sensors
  }
  applyFilter(value : string){
    this.dataSource.filter = value.trim().toLowerCase();
  }

  InitializeClick(value: number){
    this.buttonClicked.emit(value);
  }

  viewSensor(value){
    console.log(value);
    this.sensorData.emit(value);
  }
}
