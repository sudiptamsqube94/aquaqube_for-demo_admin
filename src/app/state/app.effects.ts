import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoginService } from '../login.service';
import * as LoginActions from '../state/app.actions';
import { exhaustMap, map, catchError } from 'rxjs/operators';
@Injectable()
export class LoginEffects {
    constructor(private actions$ : Actions, private loginService : LoginService){

    }

    login$ = createEffect(() => 
       this.actions$.pipe(
          ofType(LoginActions.LoginActionTypes.LoginAction),
          exhaustMap((action : LoginActions.Login) => 
            this.loginService.postUserCredential(action.payload).pipe(
                map( user => (!!user && !!user.Errors) ? (new LoginActions.LoginFailure(user.Errors)) : (new LoginActions.LoginSuccess(user))),
                )
            )
          )
       )
}