import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { IUser } from './modules/admin-panel/model/usermodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  postUserCredential(form: IUser) : Observable<any>{
    return this.http.post(environment.postLoginUrl, form);
  }
}
