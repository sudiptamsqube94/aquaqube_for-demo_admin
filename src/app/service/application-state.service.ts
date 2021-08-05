import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService {
  
  userLoggedIn: boolean = false;
  userId: number;
  userType: string;
  pinnedSensors: any; 
  constructor() { }
}
