import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { CustomerAssignment, Customer } from '../../model/customermodel';
import { DateTimeRendererComponent } from 'src/app/modules/shared/components/date-time-renderer/date-time-renderer.component';

@Component({
  selector: 'app-customer-assign-form',
  templateUrl: './customer-assign-form.component.html',
  styleUrls: ['./customer-assign-form.component.scss']
})
export class CustomerAssignFormComponent implements OnInit, OnChanges{

  public customerColumnDefs;

  private customerGridApi;
  private customerGridColumnApi;
  rowData: CustomerAssignment[] = [];
  @Input() customer: Customer;
  constructor(private spinner: NgxSpinnerService, private adminService: AdminPanelMainService) { }
  frameworkComponents = {
    dateRenderer: DateTimeRendererComponent
  }
  ngOnInit() {
    this.customerColumnDefs = [
      { headerName: 'Vendor Name', field:'vendor_name', sortable: true, filter: true, width:200, editable: false, resizable:true },
      { headerName: 'Assigned From', field:'assign_effective_from', sortable: true, filter: true, width:200, editable: false, resizable:true, cellRenderer:'dateRenderer' },
      { headerName: 'Assigned To', field:'assign_effective_to', sortable: true, filter: true, width:200, editable: false, resizable:true, cellRenderer:'dateRenderer' },
    ];
  }

  ngOnChanges(){
    console.log(this.customer)
    if (this.customer && this.customer.customer_id > 0) {
      this.spinner.show()
      this.adminService.getAssignmentHistory(this.customer.customer_id).subscribe(
        (data) => {
          console.log("data:  "+data);
          console.log("data length:  "+data.length);
          this.rowData = data;
          this.spinner.hide();
        },
        (error) => {
        console.log(error)
        this.spinner.hide()
        }
      )
    }
    
  }
  onAssignCustomerGridReady(params) {
    this.customerGridApi = params.api;
    this.customerGridColumnApi = params.columnApi;
    this.customerGridApi.sizeColumnsToFit();
  }

}
