import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Vendor } from '../../model/vendormodel';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-vendor-table',
  templateUrl: './vendor-table.component.html',
  styleUrls: ['./vendor-table.component.scss']
})
export class VendorTableComponent implements OnInit {

  @Input() vendorData : Vendor[];

  // output the event value
  @Output() ButtonClicked = new EventEmitter<number>();

  // vendor details
  @Output() vendorDetails = new EventEmitter<Vendor>();

  selectedVendor : Vendor = {
    vendor_id : 0
  }

  displayedColumns: string[] = ['select', 'vendor_code', 'vendor_name', 'vendor_type'];
  dataSource = new MatTableDataSource<any>();

  constructor() { }

  ngOnInit() {
    this.dataSource.data = this.vendorData;
  }

  ngOnChanges() {
    this.dataSource.data = this.vendorData;
  }

  InitializeClick(value : number) {
    //console.log(value);
    this.ButtonClicked.emit(value);
  }

  viewDetails(details : Vendor) {
    this.vendorDetails.emit(details);
  }

  changeSelected(value : Vendor) {
    this.selectedVendor = value;
    this.viewDetails(value);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
