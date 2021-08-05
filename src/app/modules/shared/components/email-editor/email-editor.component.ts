import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-email-editor',
  templateUrl: './email-editor.component.html',
  styleUrls: ['./email-editor.component.scss']
})
export class EmailEditorComponent implements ICellEditorAngularComp, AfterViewInit {

  private params: any;
  public value: string;
  private cancelBeforeStart: boolean = false;

  @ViewChild('input',{read: ViewContainerRef, static: false}) public input;

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
  var regexp = new RegExp(/^[A-Za-z0-9][\w.]+@[^\.].*\.[a-z]{2,}$/);
  var test = regexp.test(this.value);
  return !(test);
};

// onKeyDown(event): void {
//     if (!this.isKeyPressedNumeric(event)) {
//         if (event.preventDefault) event.preventDefault();
//     }
// }

// dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
ngAfterViewInit() {
    window.setTimeout(() => {
        this.input.element.nativeElement.focus();
    })
}

}
