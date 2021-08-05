import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Customer, Device } from '../../model/customermodel';
import { EventManager } from '@angular/platform-browser';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { gateway } from '../../model/gateway';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { NgxSpinnerService } from 'ngx-spinner';


const ELEMENT_DATA: Device[] = [
  {device_id:1, device_name : "device1", device_mac: "00123"},
  {device_id:2, device_name : "device1", device_mac: "00123"},
  {device_id:3, device_name : "device1", device_mac: "00123"},
  {device_id:4, device_name : "device1", device_mac: "00123"},
  {device_id:5, device_name : "device1", device_mac: "00123"},
  {device_id:6, device_name : "device1", device_mac: "00123"},
  {device_id:7, device_name : "device1", device_mac: "00123"}
];

@Component({
  selector: 'app-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.scss']
})
export class DeviceTableComponent implements OnInit {
  @Output() buttonClicked = new EventEmitter<number>();
  @Output() gatewayData = new EventEmitter<gateway>();
  @Output() deviceName = new EventEmitter<string>();
  @Output() deviceName2 = new EventEmitter<string>();
  @Output() deviceId = new EventEmitter<number>();
  @Output() deviceId2 = new EventEmitter<number>();
  @Output() deviceAssign = new EventEmitter<number>();

  @Input() gateways: gateway[];
  displayedColumns: string[] =['select', 'gateway_name', 'uid', 'status' ];
  dataSource = new MatTableDataSource<any>();
  selectedDevice: gateway = {
    gateway_id: 0
  }
  constructor(private adminPanelService : AdminPanelMainService, private spinner : NgxSpinnerService, private _snackBar : MatSnackBar) { }

  ngOnInit() {
    this.spinner.show()
    this.adminPanelService.gateAllGateways().subscribe(
      (data) => {
        console.log(data)
        this.dataSource.data = data
        this.spinner.hide()
      },
      (error) => {
        console.error(error);
        this.spinner.hide();
      }
    );
  }
  ngOnChanges(){
    //console.log(this.deviceData)
    this.dataSource.data = this.gateways;
  }
  InitializeClick(value:number){
    this.buttonClicked.emit(value)
  }

  gotoDeviceMonitor(rowId: number, name: string){
    this.deviceName2.emit(name)
    this.deviceId2.emit(rowId);
    console.log(rowId)
  }

  gotoDeviceAssignment(rowId: number, name: string){
    this.deviceName.emit(name)
    this.deviceAssign.emit(rowId)
  }

  viewDetails(value: gateway){
    this.gatewayData.emit(value)
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
