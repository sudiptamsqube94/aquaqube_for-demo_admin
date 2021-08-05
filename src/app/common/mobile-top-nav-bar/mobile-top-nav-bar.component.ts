import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-top-nav-bar',
  templateUrl: './mobile-top-nav-bar.component.html',
  styleUrls: ['./mobile-top-nav-bar.component.scss']
})
export class MobileTopNavBarComponent implements OnInit {
  routerLink1 = "/mobile-profile"

  constructor() { }

  ngOnInit() {
  }

}
