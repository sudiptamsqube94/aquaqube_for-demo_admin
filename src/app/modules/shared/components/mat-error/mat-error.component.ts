import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-mat-error',
  template:`
  <div [@animation]="_state" style="margin-top:-1rem;font-size:.75rem">
      <mat-error >
      {{message}}
    </mat-error>
    </div>
  `,
  animations: [
    trigger('animation', [
      state('show', style({
        opacity: 1,
      })),
      state('hide',   style({
        opacity: 0,
        transform: 'translateY(-1rem)'
      })),
      transition('show => hide', animate('200ms ease-out')),
      transition('* => show', animate('200ms ease-in'))
      
    ]),
  ]
})
export class MatErrorComponent {

  _error:any
  _state:any
  message;

  constructor() { }

  @Input() set error(value)
  {
    if (value && !this.message)
    {
      this.message=value;
      this._state='hide'
      setTimeout(()=>
      {
        this._state='show'
      })
    }
    else{
    this._error=value;
    this._state=value?'show':'hide'
    }
  }
}
