import { LoginActions, LoginActionTypes } from './app.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UserState{
    userDetail ?: UserDetailState
}

export interface UserDetailState{
    user_name ?: string;
    user_id ?: number;
    user_type ?: string;
    customer_id ?: number;
}

export interface State {
    user ?: UserState
}

//Initial state

const initialState : UserState = {
     userDetail : {
         user_id : 0,
         user_name : 'noname',
         user_type : 'none',
         customer_id : 0
     }
}

//reducer function 

export function reducer(state : UserState = initialState, action : LoginActions) : UserState{
    switch (action.type) {
        case LoginActionTypes.LoginSuccessAction:
            return {
                ...state,
                userDetail : action.payload
            }            
            break;
        case LoginActionTypes.LoginFailureAction:
            return {
                ...state,
                userDetail : {
                    user_id : 0,
                    user_name :'noname',
                    user_type :'none',
                    customer_id : 0
                } 
            }
        default:
            return state
            break;
    }
}

//selectors
const getUserFeatureState = createFeatureSelector<UserState>('user');
export const getUserDetail = createSelector(getUserFeatureState, state => state.userDetail);