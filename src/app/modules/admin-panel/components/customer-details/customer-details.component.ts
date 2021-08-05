import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { Customer, Address, LegalInfo, AdditionalAttributes, Email, Phone, Branch, Domaindata } from '../../model/customermodel';
import * as _ from "lodash";
import { NumericEditorComponent } from 'src/app/modules/shared/components/numeric-editor/numeric-editor.component';
import { NullValueComponent } from 'src/app/modules/shared/components/null-value/null-value.component';
import { EmailEditorComponent } from 'src/app/modules/shared/components/email-editor/email-editor.component';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { SuccessSnackberComponent } from 'src/app/modules/shared/components/success-snackber/success-snackber.component';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnChanges {
  // selected tab value
  currentTab = 0;
  @Output() ButtonClicked = new EventEmitter<number>();
  // input for customer data
  @Input() customerData : Customer;

  @Output() editClicked =  new EventEmitter<Address>();

  @Input() legalinfo_Type : Domaindata[];

  @Input() isd_code : Domaindata[];

   phoneFrameworkComponents;
   emailFrameworkComponents;
   addressData: Address[] = [];
   nullvalueFrameworkComponents: any;
   legalData: LegalInfo[] =[];
   additionalData: AdditionalAttributes[] = [];
   emailData: Email[] = [];
   phoneData: Phone[] = [];

   addressColumnDefs;
   legalColumnDefs;
   additionalColumnDefs;
   emailColumnDef;
   phoneColumnDef;

  private addressGridApi;
   addressGridColumnApi;
  private legalGridApi;
   legalGridColumnApi;
  private phoneGridApi;
   phoneGridColumnApi;
  private emailGridApi;
   emailGridColumnApi;
  private additionalGridApi;
   additionalGridColumnApi;
   rowSelection : string;
   selectedRow : Address;

   addressDataCopy: Address[] = [];

  constructor(private adminService : AdminPanelMainService, private spinner: NgxSpinnerService, private _sanckBar : MatSnackBar) { }

  ngOnInit() {

    this.phoneFrameworkComponents = {
      numericEditor : NumericEditorComponent
    };

    this.nullvalueFrameworkComponents = {
      nullvalueEditor : NullValueComponent
    };

    this.emailFrameworkComponents = {
      emailEditor : EmailEditorComponent
    };

    this.addressColumnDefs = [
      { headerName: 'Type', field: 'add_type', sortable: true, filter: true, width:100, editable: false, resizable:true },
      { headerName: 'Address', field: 'add_address_line1', width:200, editable: false, resizable: true, sortable: true, filter: true, autoHeight: true, cellStyle: {'white-space': 'normal', 'height': 'auto', 'overflow': 'visible', 'text-overflow': 'clip', 'overflow-wrap': 'break-word'} },
    ];

    this.legalColumnDefs = [
      { headerName: 'Type', field: 'legalinfo_type', sortable: true, filter: true, width:100,editable: true,resizable:true,
      cellEditor: 'agSelectCellEditor', 
      cellEditorParams: { values: [] }},
      { headerName: 'Value', field: 'legalinfo_value', width:200,editable: true,resizable:true, cellEditor: 'nullvalueEditor'},
    ];

    this.additionalColumnDefs = [
      { headerName: 'Attribute', field: 'addinfo_attr', sortable: true, filter: true, width:100,editable: true,resizable:true, cellEditor: 'nullvalueEditor'},
      { headerName: 'Value', field: 'addinfo_value', width:200,editable: true,resizable:true, cellEditor: 'nullvalueEditor'},
    ];

    this.emailColumnDef = [
      { headerName: 'Email Address', field: 'eml_address', editable: true, resizable:true,
      cellEditor: "emailEditor" },
    ];

    this.phoneColumnDef = [
      { headerName: 'ISD Code', field: 'ph_isd_code',width:100, editable: true,resizable:true,
      cellEditor: 'agSelectCellEditor', 
      cellEditorParams: { values: [] } },
      { headerName: 'Number', field: 'ph_no',width:200, editable: true, resizable:true,
      cellEditor: "numericEditor" },
    ];
    this.rowSelection = 'single';
  }

  resizeGrid(value : any) {
    this.currentTab = value.index;
    switch (value.index) {
      case 0:
        this.addressGridApi.sizeColumnsToFit();  
      break;

      case 1:
        this.legalGridApi.sizeColumnsToFit();  
      break;

      case 2:
        this.phoneGridApi.sizeColumnsToFit();  
      break;

      case 3:
        this.emailGridApi.sizeColumnsToFit();  
      break;

      case 4:
        this.additionalGridApi.sizeColumnsToFit();  
      break;

    }
  }

  InitializeClick() {
    this.ButtonClicked.emit(this.currentTab + 4);
  }

  ngOnChanges() {
    console.log("print legal info type  ");
    console.log(this.legalinfo_Type);
    console.log("Phone isd code  "+this.isd_code);
    
    
    if (this.customerData && this.customerData.customer_id != 0) {
      this.addressDataCopy = _.cloneDeep(this.customerData.addresses);
      this.legalData = this.customerData.infos;
      this.additionalData = this.customerData.attributes;
      this.phoneData = this.customerData.phones;
      this.emailData = this.customerData.emails;
    }

    if(this.addressDataCopy) {
      this.addressDataCopy.map(m => m.add_address_line1 = m.add_address_line1 + ", " + m.add_address_line2 + ", " + m.add_city + ", " + m.add_state + ", " + m.add_country + ", " + m.add_pin);
    }

    if(this.legalinfo_Type && this.isd_code) {
      console.log("this is form isd code and legal info type if block  ");
      console.log(this.legalinfo_Type);
      console.log("this is form isd code and legal info type if block  ");
      console.log(this.isd_code);
      this.phoneColumnDef = [
        { headerName: 'ISD Code', field: 'ph_isd_code', editable: true,
          cellEditor: 'agSelectCellEditor', 
          cellEditorParams : { values : this.isd_code.map(m => m.domain_value + " - " + m.domain_code) } },
        { headerName: 'Number', field: 'ph_no', editable: true, cellEditor: 'numericEditor' }
      ];
      this.legalColumnDefs = [
        { headerName: 'Type', field: 'legalinfo_type', sortable: true, filter: true, editable: true,
          cellEditor : 'agSelectCellEditor',
          cellEditorParams : { values : this.legalinfo_Type.map(m => m.domain_value)}},
        
        { headerName: 'Value', field: 'legalinfo_value',editable : true, cellEditor: 'nullvalueEditor' }
      ];
    }
  }

  onAddressGridReady(params) {
    this.addressGridApi = params.api;
    this.addressGridColumnApi = params.columnApi;
    this.addressGridApi.sizeColumnsToFit();
  }

  onLegalGridReady(params) {
    this.legalGridApi = params.api;
    this.legalGridColumnApi = params.columnApi;
  }

  onPhoneGridReady(params) {
    this.phoneGridApi = params.api;
    this.additionalGridColumnApi = params.columnApi;
  }

  onEmailGridReady(params) {
    this.emailGridApi = params.api;
    this.emailGridColumnApi = params.columnApi;
  }

  onAdditionalGridReady(params) {
    this.additionalGridApi = params.api;
    this.additionalGridColumnApi = params.columnApi;
  }

  onColumnResized() {
    this.addressGridApi.resetRowHeights();
  }

  onSelectionChanged(value) {
    this.selectedRow = this.addressGridApi.getSelectedRows()[0];
    //console.log(this.selectedRow);
    
  }

  InitializeEdit() {
    var selectedId = this.addressGridApi.getSelectedRows()[0].add_id;
    this.editClicked.emit(this.customerData.addresses.find(m => m.add_id == selectedId));
    console.log("form customer details  "+this.addressGridApi.getSelectedRows()[0]);
    
  }

  onCellValueChange(params) {
    this.spinner.show();
    this.adminService.updateCustomer(this.customerData).subscribe(
      (data) => {
        this.spinner.hide();
        console.log("data form oncelvalue change methid in customer:  "+data);
        if(data == "001") {
          this._sanckBar.openFromComponent(SuccessSnackberComponent, {data : "Customer Details Updated Successfully", duration : 3000});

          if(params == "reload") {
            this.addressDataCopy =  _.cloneDeep(this.customerData.addresses);
            if(this.addressDataCopy) {
              this.addressDataCopy.map(m => m.add_address_line1 = m.add_address_line1 + ", " + m.add_address_line2 + ", " + m.add_city + ", " + m.add_state + ", " + m.add_country + ", " + m.add_pin );
            }
            this.phoneData = _.cloneDeep(this.customerData.phones);
          }
        }
        else {
          this.adminService.getError(data);
        }
      },
      (error) => {
        console.error(error);
        this.spinner.hide();
      }
    );
  }

  onPhoneValueChange(params) {
    if(params.newValue && ((params.data.ph_isd_code as string).indexOf(" - ") > 0)) {
      this.customerData.phones.find(m => m.ph_id == params.data.ph_id).ph_isd_code = params.data.ph_isd_code.split(" - ")[1];
    }

    else {
      this.customerData.phones = this.phoneData;
    }
    this.onCellValueChange("reload");
  }

}
