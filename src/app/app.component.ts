import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as fromLogin from './state/app.reducer';
import { Store, select } from '@ngrx/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('sidenavState', [
      state('open', style({
        flex:"0 1 calc(18% - 5px)"
      })),
      state('shrunk', style({
        flex:"0 1 calc(4% - 5px)",
        fontSize: "0px"
      })),
      transition('shrunk => open', animate('500ms ease-in')),
      transition('open => shrunk', animate('500ms ease-out'))
    ]),
    trigger('mainContentState', [
      state('shrunk', style({
        flex:"0 1 calc(96% - 5px)"
      })),
      state('open', style({
        flex:"0 1 calc(82% -5px)"
      })),
      transition('shrunk => open', animate('500ms ease-in')),
      transition('open => shrunk', animate('500ms ease-out'))
    ]),
  ]
})
export class AppComponent {
  title = 'iot-dashboard';
  sidenavState: string = 'open';
  router: string;
  isMobile : boolean = false;
  isDesktop : boolean = false;
  isTablet : boolean = false;
  shrinkSidenav(){
    this.sidenavState = this.sidenavState === 'open' ? 'shrunk' : 'open';
  }
  userDetails : fromLogin.UserDetailState;

  constructor(private _router: Router, private deviceDetector : DeviceDetectorService, private store: Store<fromLogin.State>){
    this.router = _router.url;
    console.log(this.router);
    
    this.isMobile = deviceDetector.isMobile();
    this.isTablet = deviceDetector.isTablet();
    this.isDesktop = deviceDetector.isDesktop();

    this.store.pipe(select(fromLogin.getUserDetail)).subscribe( 
      userDetail => {
        if (userDetail) {
          this.userDetails = userDetail
          console.log(userDetail)
        }
      }
    )
  }
}
