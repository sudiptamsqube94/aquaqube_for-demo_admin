import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Isidenav } from 'src/app/common/model/isidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter();

  sidenavOpen: boolean = true;
  selectedNavItem: string;

  sidenavData0: Isidenav[] = [
    {
      displayName: "Dashboard",
      iconClass: "view_quilt",
      redirectLink: "/dashboard"
    }
  ];

  sidenavData1: Isidenav[] = [
    {
      displayName: "Admin Panel",
      iconClass: "view_quilt",
      redirectLink: "/admin-panel"
    }
  ];

  sidenavData2 : Isidenav[] = [
    {
      displayName:"Device Management",
      iconClass: "devices",
      redirectLink: "/device-management"
    }
  ];
  
  constructor() { }

  ngOnInit() {
  }

  onSidenavToggle() {
    this.sidenavOpen = !this.sidenavOpen;
    this.sidenavToggle.emit();
  }

}
