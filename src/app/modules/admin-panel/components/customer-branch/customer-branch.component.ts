import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Customer, Branch, Address } from '../../model/customermodel';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { NullValueComponent } from 'src/app/modules/shared/components/null-value/null-value.component';
import * as _ from "lodash";

@Component({
  selector: 'app-customer-branch',
  templateUrl: './customer-branch.component.html',
  styleUrls: ['./customer-branch.component.scss']
})
export class CustomerBranchComponent implements OnChanges {

  // input for customer data
  @Input() customerData : Customer;
  branchesData : Branch[] = [];
  @Output() editClicked =  new EventEmitter<Branch>();

  @Output() ButtonClicked = new EventEmitter<number>();

  nullvalueFrameworkComponents: any;

  branchesColumnDef;

  private branchGridApi;
  branchGridApiColoumnApi;

  rowSelection : string;
  selectedRow : Branch;

  addressDataCopy: Branch[] = [];

  constructor(private adminService : AdminPanelMainService, private spinner: NgxSpinnerService, private _sanckBar : MatSnackBar) { }

  ngOnInit() {
    this.branchesColumnDef = [
      { headerName: "Branch name", field : 'branch_name',width:100, editable: false,resizable:true, sortable: true, filter: true  },
      { headerName: "Address", field: 'branch_add_line1', width:100, editable: false,resizable:true, autoHeight: true, cellStyle: {'white-space': 'normal', 'height': 'auto', 'overflow': 'visible', 'text-overflow': 'clip', 'overflow-wrap': 'break-word'} }
    ];
    this.rowSelection = 'single';
  }

  onBranchGridReady(params) {
    this.branchGridApi = params.api;
    this.branchGridApiColoumnApi = params.columnApi;
    this.branchGridApi.sizeColumnsToFit();
  }

  onSelectionChanged(value) {
    this.selectedRow = this.branchGridApi.getSelectedRows()[0];
  }

  onColumnResized() {
    this.branchGridApi.resetRowHeights();
  }

  ngOnChanges() {
    if(this.customerData && this.customerData.customer_id != 0) {
      this.addressDataCopy = _.cloneDeep(this.customerData.branches);
    }

    if(this.addressDataCopy) {
      this.addressDataCopy.map(m=> m.branch_add_line1 = m.branch_add_line1 + ", " + m.branch_add_line2 +", "+ m.branch_add_city + ", " + m.branch_add_state + ", " + m.branch_add_country + ", " + m.branch_add_pin);
    }
  }

  InitializeClick() {
    this.ButtonClicked.emit(9);
  }

  InitializeEdit() {
    var selectedId = this.branchGridApi.getSelectedRows()[0].branch_id;
    this.editClicked.emit(this.customerData.branches.find(m=>m.branch_id == selectedId));
  }

}


