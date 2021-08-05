import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorMainService {

  constructor(private http: HttpClient) { }

  getCustomerManaged(id:number):Observable<any[]>{
    return this.http.get<any>(environment.customerManageUrl+id+'?format=json')
  }
}
