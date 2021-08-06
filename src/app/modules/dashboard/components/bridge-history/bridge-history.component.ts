import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-bridge-history',
  templateUrl: './bridge-history.component.html',
  styleUrls: ['./bridge-history.component.scss']
})
export class BridgeHistoryComponent implements OnInit {

  constructor( public dialog: MatDialogRef<BridgeHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
  }

}
