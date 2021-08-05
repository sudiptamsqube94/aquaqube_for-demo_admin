import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Device, Sensor } from '../../model/customermodel';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { SuccessSnackberComponent } from 'src/app/modules/shared/components/success-snackber/success-snackber.component';
import { NullValueComponent } from 'src/app/modules/shared/components/null-value/null-value.component';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent implements OnInit {
  @Output() buttonClicked = new EventEmitter<number>();

  @Input() device: Device;
  sensors: Sensor[] = [];
  sensorColumnDefs;
  sensorGridApi;
  sensorGridColumnApi;

  nullvalueFrameworkComponents: any;
  constructor(private adminService: AdminPanelMainService, private spinner: NgxSpinnerService, private _sanckBar : MatSnackBar) { }

  ngOnInit() {
    this.nullvalueFrameworkComponents = {
      nullvalueEditor : NullValueComponent
    };
    this.sensorColumnDefs = [
      {headerName:'Sensor Name', field:'sensor_name'},
      {headerName:'Sensor Type', field:'sensor_type', resizable:true},
      {headerName:'Sensor Threshold Max', field:'sensor_threshold_max', editable:true, sortable:true, cellEditor: 'nullvalueEditor'},
      {headerName:'Sensor Threshold Min', field:'sensor_threshold_min', editable:true, sortable:true, cellEditor: 'nullvalueEditor'},
    ]
  }
  ngOnChanges(){
    if (this.device && this.device.device_id != 0) {
      this.sensors = this.device.sensors
    }
  }
  onSensorGridReady(params){
    this.sensorGridApi = params.api;
    this.sensorGridColumnApi = params.columnApi
  }

  onCellValueChange(params){
    this.spinner.show()
    this.adminService.updateDevice(this.device).subscribe(
      (data) => {
        console.log(data);
        this.spinner.hide();
        if(data == "001"){
          this._sanckBar.openFromComponent(SuccessSnackberComponent, {data: "Update Device Details", duration: 3000});
        }
      },
      (error) => {
        console.log(error)
        this.spinner.hide();
      }
    );
  }

  InitializeClick(value){
    this.buttonClicked.emit(value);
  }
}
