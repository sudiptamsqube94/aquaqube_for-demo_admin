import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-numeric-editor',
  templateUrl: './numeric-editor.component.html',
  styleUrls: ['./numeric-editor.component.scss']
})
export class NumericEditorComponent implements ICellEditorAngularComp, AfterViewInit {
  private params: any;
  public value: number;
  private cancelBeforeStart: boolean = false;

  @ViewChild('input', {read: ViewContainerRef, static: false }) public input;

  agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;

    // only start edit if key pressed is a number, not a letter
    this.cancelBeforeStart = params.charPress && ('1234567890'.indexOf(params.charPress) < 0);
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
      return (this.value > 9999999999 || this.value < 1000000000 || isNaN(this.value));
    };

    // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
    ngAfterViewInit() {
      window.setTimeout(() => {
          this.input.element.nativeElement.focus();
      })
    }

  // constructor() { }

  // ngOnInit() {
  // }

}
