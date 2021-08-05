import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Customer } from '../../model/customermodel';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {

  @Input() customerData : Customer[];

  @Output() ButtonClick = new EventEmitter<number>();

  //Customer details
  @Output() customerDetails = new EventEmitter<Customer>();
  selectedCustomer : Customer = {
    customer_id : 0
  };

  displayedColumns: string[] = ['select', 'customer_code', 'customer_name', 'customer_type' ];
  dataSource = new MatTableDataSource<any>();

  constructor() { }

  ngOnInit() {
    this.dataSource.data = this.customerData;
  }

  ngOnChanges() {
    this.dataSource.data = this.customerData;
  }

  InitializeClick(value : number) {
    this.ButtonClick.emit(value);
  }

  // view customer details
  viewDetails(details : Customer) {
    //console.log(details);
    this.customerDetails.emit(details);
  }

  // Click on table row
  changeSelected(value : Customer) {
    this.selectedCustomer = value;
    this.viewDetails(value);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
