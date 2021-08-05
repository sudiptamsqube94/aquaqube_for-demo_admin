import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ICustomerAssignmenrInfo } from 'src/app/modules/admin-panel/model/vendormodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-vendor-customer',
  templateUrl: './show-vendor-customer.component.html',
  styleUrls: ['./show-vendor-customer.component.scss']
})
export class ShowVendorCustomerComponent implements OnInit {

  @Input() assignInfo: ICustomerAssignmenrInfo[];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns: string[] = ['select', 'customer_code', 'customer_name', 'customer_type', 'view'];
  dataSource = new MatTableDataSource<ICustomerAssignmenrInfo>();
  SelectedCustomer: ICustomerAssignmenrInfo = {
    customer_id:0
  };
  
  constructor(private router: Router) { }

  ngOnInit() {
    // this.dataSource.data = ELEMENT_DATA;
  }
  ngOnChanges(){
    console.log(this.assignInfo)
    this.dataSource.data = this.assignInfo;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  SelectBranch(value: any) {
    this.SelectedCustomer = value;
    // console.log(this.SelectedCustomer)
  }
  goTo(id:number){
    console.log(id);
    this.router.navigate(['/dashboard']);
  }
}
