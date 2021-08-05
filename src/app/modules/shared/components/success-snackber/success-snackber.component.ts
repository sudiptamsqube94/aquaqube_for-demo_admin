import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-success-snackber',
  templateUrl: './success-snackber.component.html',
  styleUrls: ['./success-snackber.component.scss']
})
export class SuccessSnackberComponent implements OnInit {

  message: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data : any) { 
    this.message = data;
  }

  ngOnInit() {
  }

}
