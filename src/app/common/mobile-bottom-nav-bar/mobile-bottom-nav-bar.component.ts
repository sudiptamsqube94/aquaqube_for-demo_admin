import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-bottom-nav-bar',
  templateUrl: './mobile-bottom-nav-bar.component.html',
  styleUrls: ['./mobile-bottom-nav-bar.component.scss']
})
export class MobileBottomNavBarComponent implements OnInit {
  routerLink0 = "/mobile-locations" 
  routerLink1 = "/mobile-devices" 
  routerLink2 = "/mobile-notifications" 
  routerLink3 = "/mobile-contact" 
  routerLink4 = "/mobile-dashboard" 
  constructor() { }

  ngOnInit() {
  }

}
