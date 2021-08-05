import { Component, OnInit, Output, EventEmitter } from '@angular/core';
//import { Icustomer } from '../../model/icustomer';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {
  @Output() openPopup = new EventEmitter<number>();
  //displayed columns
  displayedColumns = ['no', 'name', 'address', 'subscription_type']

  /*restaurants : Icustomer[] = [
    {no:1, name: 'Arsalan Restaurant & Caterer', address:'Chinar Park, Sukanta Pally, Newtown, Kolkata, West Bengal 700157', latitude:1234578, longitude:7894561, subscription_type:"Tier1"},
    {no:2, name: 'Aminia', address:' 6A, SN Banerjee Road, New Market Area, Dharmatala, Taltala, Kolkata, West Bengal 700087', latitude:1234578, longitude:7894561, subscription_type:"Tier2"},
    {no:3, name: 'Arsalan Restaurant & Caterer', address:'Chinar Park, Sukanta Pally, Newtown, Kolkata, West Bengal 700157', latitude:1234578, longitude:7894561, subscription_type:"Tier3"},
    {no:4, name: 'Arsalan Restaurant & Caterer', address:'Chinar Park, Sukanta Pally, Newtown, Kolkata, West Bengal 700157', latitude:1234578, longitude:7894561, subscription_type:"Tier4"},
    {no:5, name: 'Arsalan Restaurant & Caterer', address:'Chinar Park, Sukanta Pally, Newtown, Kolkata, West Bengal 700157', latitude:1234578, longitude:7894561, subscription_type:"Tier1"},
    {no:6, name: 'Arsalan Restaurant & Caterer', address:'Chinar Park, Sukanta Pally, Newtown, Kolkata, West Bengal 700157', latitude:1234578, longitude:7894561, subscription_type:"Tier2"},
    {no:7, name: 'Arsalan Restaurant & Caterer', address:'Chinar Park, Sukanta Pally, Newtown, Kolkata, West Bengal 700157', latitude:1234578, longitude:7894561, subscription_type:"Tier3"},
    {no:8, name: 'Arsalan Restaurant & Caterer', address:'Chinar Park, Sukanta Pally, Newtown, Kolkata, West Bengal 700157', latitude:1234578, longitude:7894561, subscription_type:"Tier1"},
  ];*/
  //dataSource = new MatTableDataSource(this.restaurants); 
  constructor() { }

  ngOnInit() {
  }
  openForm(){
    this.openPopup.emit(1);
  }
}
