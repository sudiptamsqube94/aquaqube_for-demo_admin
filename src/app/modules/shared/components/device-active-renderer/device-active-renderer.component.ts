import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-device-active-renderer',
  templateUrl: './device-active-renderer.component.html',
  styleUrls: ['./device-active-renderer.component.scss']
})
export class DeviceActiveRendererComponent implements ICellRendererAngularComp {

  private params: any;
  active: boolean;

  refresh(params: any): boolean{
    this.params = params;
    return true;
  }

  agInit(params: import('ag-grid-community').ICellRendererParams): void {
    this.params = params;
    this.active = params.formatValue(params.value);
  }
  constructor() { }

  ngOnInit() {
  }

}
