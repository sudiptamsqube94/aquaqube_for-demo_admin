import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { IUser } from '../modules/admin-panel/model/usermodel';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApplicationStateService } from '../service/application-state.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Store, select } from '@ngrx/store';
import * as fromLogin from '../state/app.reducer';
import * as LoginActions from '../state/app.actions';
import { LoginActionTypes } from '../state/app.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  formData: IUser;
  isMobile: boolean = false;
  isDesktop: boolean = false;
  isTablet: boolean = false;
  constructor(private fb: FormBuilder, private appState: ApplicationStateService, private loginService: LoginService, private router: Router, private spinner: NgxSpinnerService, private deviceDetector: DeviceDetectorService, private store: Store<fromLogin.State>) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      user_name: ['', [Validators.required]],
      user_password: ['', [Validators.required]]
    })
    this.isMobile = this.deviceDetector.isMobile();
    this.isDesktop = this.deviceDetector.isDesktop();
    this.isTablet = this.deviceDetector.isTablet();

    this.store.pipe(select(fromLogin.getUserDetail)).subscribe(
      userDetail => {
        if (userDetail.user_id != 0) {
          console.log(userDetail);
          if (userDetail.user_type == "admin") {
            console.log(userDetail.user_type);

            this.router.navigateByUrl("/admin-panel")
          } else if (userDetail.user_type == "vendor") {
            this.router.navigateByUrl("/vendor-panel")
          } else if (userDetail.user_type == "customer") {
            if (this.isMobile) {
              //full screen
              let elem : any = document.documentElement;
              let methodToBeInvoked = elem.requestFullscreen ||
                elem.webkitRequestFullScreen || elem['mozRequestFullscreen']
                ||
                elem['msRequestFullscreen'];
              if (methodToBeInvoked) methodToBeInvoked.call(elem);
              this.router.navigateByUrl("/mobile-dashboard")
            } else if (this.isDesktop) {
              this.router.navigateByUrl("/dashboard")
            }
          }
        }
      }
    )
  }

  onSubmit(form) {
    this.formData = {
      user_name: form.controls.user_name.value,
      user_password: form.controls.user_password.value
    }
    // this.loginService.postUserCredential(this.formData).subscribe(
    //   (data) => {
    //     console.log(data)
    //     this.spinner.show()
    //     if (data.user_type == 'customer') {
    //       if (this.isDesktop) {
    //         this.router.navigate(['/dashboard']);
    //         this.appState.userLoggedIn = true;
    //         this.appState.userType = data.user_type;
    //         this.appState.userId = data.user_id;
    //         this.spinner.hide()
    //       } else if ( this.isMobile || this.isTablet) {
    //         this.router.navigate(['/mobile-dashboard']);
    //         this.appState.userLoggedIn = true;
    //         this.appState.userType = data.user_type;
    //         this.appState.userId = data.user_id;
    //         this.spinner.hide()
    //       }

    //     } else if (data.user_type == 'vendor'){
    //       this.router.navigate(['/vendor-panel']);
    //       this.appState.userLoggedIn = true;
    //       this.appState.userType = data.user_type;
    //       this.appState.userId = data.user_id;
    //       this.spinner.hide()
    //     }else{
    //       this.router.navigate(['/admin-panel']);
    //       this.appState.userLoggedIn = true;
    //       this.appState.userType = data.user_type;
    //       this.spinner.hide()
    //     }
    //   },
    //   (error) =>{
    //     console.log(error)
    //     this.spinner.hide()
    //   }
    // );
    this.store.dispatch(new LoginActions.Login(this.formData));
  }

}
