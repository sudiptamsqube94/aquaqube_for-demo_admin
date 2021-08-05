import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { Customer } from '../../model/customermodel';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-customer-assign',
  templateUrl: './customer-assign.component.html',
  styleUrls: ['./customer-assign.component.scss']
})
export class CustomerAssignComponent implements OnInit {

  @Output() buttonClicked = new EventEmitter<number>();
  @Output() customer = new EventEmitter<Customer>();
  customerData = new MatTableDataSource<any>();
  displayedColumns: string[] =['select', 'customer_name'];
  selectedCustomer = {
    customer_id: 0
  }
  
  constructor(private adminService: AdminPanelMainService) { }

  ngOnInit() {
    this.adminService.getCustomerNameandId().subscribe(
      (data) => {
        console.log(data);
        this.customerData.data = data;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  InitializeClick(value){
    this.buttonClicked.emit(value)
  }

  viewDetails(value : Customer){
    this.customer.emit(value);
    console.log(value);
  }

  applyFilter(filterValue: string) {
    this.customerData.filter = filterValue.trim().toLowerCase();
  }
  InitializeEdit(){
    
  }
}
