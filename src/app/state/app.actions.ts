import { Action } from '@ngrx/store';
import { UserDetailState } from './app.reducer';

export enum LoginActionTypes{
    LoginAction = '[Login] Login Action',
    LoginSuccessAction = '[Login] Login Success',
    LoginFailureAction = '[Login] Login Failure',
}

export class LoginSuccess implements Action{
    type = LoginActionTypes.LoginSuccessAction;

    constructor( public payload : UserDetailState){}
}

export class LoginFailure implements Action {
    type = LoginActionTypes.LoginFailureAction;
    
    constructor( public payload : UserDetailState){}
}

export class Login implements Action{
    type = LoginActionTypes.LoginAction;

    constructor( public payload : UserDetailState){}
}

export type LoginActions = Login | LoginFailure | LoginSuccess;