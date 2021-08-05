import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Device } from '../../model/customermodel';

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
  selector: 'app-device-assignment',
  templateUrl: './device-assignment.component.html',
  styleUrls: ['./device-assignment.component.scss']
})
export class DeviceAssignmentComponent implements OnInit {

  @Output() rowId = new EventEmitter<number>();
  @Output() buttonClicked = new EventEmitter<number>();
  @Input()deviceName;
  @Input() deviceId;
  @Input() deviceData: Device[] = null;
  displayedColumns: string[] =['select', 'device_name', 'device_mac'];

  selectedDevice: Device = {
    device_id: 0
  }
  constructor() { }

  ngOnInit() {
  }
  viewDetails(value: Device){
    this.rowId.emit(value.device_id)
    console.log(value.device_id)
  }

  InitializeClick(){
    this.buttonClicked.emit(19);
  }
}
