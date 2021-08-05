import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-null-value',
  templateUrl: './null-value.component.html',
  styleUrls: ['./null-value.component.scss']
})
export class NullValueComponent implements ICellEditorAngularComp, AfterViewInit {

  private params: any;
  public value: string;
  private cancelBeforeStart: boolean = false;

  @ViewChild('input', {read: ViewContainerRef, static: false}) public input;

  agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;
  }

  getValue(): any {
    return this.value;
  }

  isCancelBeforeStart(): boolean {
    return this.cancelBeforeStart;
  }

  // will reject the number if it greater than 1,000,000
  // not very practical, but demonstrates the method.
  isCancelAfterEnd(): boolean {
    var regexp = new RegExp(/^[A-Za-z0-9].*$/);
    var test = regexp.test(this.value);
    return !(test);
  };

  ngAfterViewInit() {
    window.setTimeout(() => {
        this.input.element.nativeElement.focus();
    })
  }

}
