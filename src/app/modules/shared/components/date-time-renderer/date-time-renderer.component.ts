import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-date-time-renderer',
  templateUrl: './date-time-renderer.component.html',
  styleUrls: ['./date-time-renderer.component.scss']
})
export class DateTimeRendererComponent implements ICellRendererAngularComp {
  private params: any;
  date: Date;

  refresh(params: any):boolean{
    this.params = params;
    return true;
  }

  agInit(params: import('ag-grid-community').ICellRendererParams): void{
    this.params = params;
    this.date = params.formatValue(params.value);
  }

  constructor() { }

  ngOnInit() {
  }

}
