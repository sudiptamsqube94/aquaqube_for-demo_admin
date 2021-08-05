import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-device-health-renderer',
  templateUrl: './device-health-renderer.component.html',
  styleUrls: ['./device-health-renderer.component.scss']
})
export class DeviceHealthRendererComponent implements ICellRendererAngularComp {
  private params: any;
  health: string;

  refresh(params: any): boolean{
    this.params = params
    return true;
  }

  agInit(params: import('ag-grid-community').ICellRendererParams) : void {
    this.params = params;
    this.health = params.formatValue(params.value)
  }
  constructor() { }

  ngOnInit() {
  }

}
