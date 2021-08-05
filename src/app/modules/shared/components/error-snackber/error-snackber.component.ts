import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-error-snackber',
  templateUrl: './error-snackber.component.html',
  styleUrls: ['./error-snackber.component.scss']
})
export class ErrorSnackberComponent implements OnInit {

  message: string;
  constructor( @Inject(MAT_SNACK_BAR_DATA) public data : any) { 
    this.message = data; 
  }

  ngOnInit() {
  }

}
