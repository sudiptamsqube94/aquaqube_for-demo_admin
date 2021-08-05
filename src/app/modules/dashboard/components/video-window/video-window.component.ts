import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-video-window',
  templateUrl: './video-window.component.html',
  styleUrls: ['./video-window.component.scss']
})
export class VideoWindowComponent implements OnInit {

  title = "Video"
  constructor(public dialogref: MatDialogRef<VideoWindowComponent>) { }

  ngOnInit() {
  }

  closePopup(){
    this.dialogref.close()
  }

}
