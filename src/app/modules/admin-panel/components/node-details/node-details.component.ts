import { Component, OnInit, Input } from '@angular/core';
import { NullValueComponent } from 'src/app/modules/shared/components/null-value/null-value.component';
import { sensor } from '../../model/gateway';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { SuccessSnackberComponent } from 'src/app/modules/shared/components/success-snackber/success-snackber.component';

@Component({
  selector: 'app-node-details',
  templateUrl: './node-details.component.html',
  styleUrls: ['./node-details.component.scss']
})
export class NodeDetailsComponent implements OnInit {

  sensorColumns;
  nullvalueFrameworkComponents: any;
  rowData : sensor[] = [];
  nodeDetailGridApi;
  nodeDetailColumnApi;
  @Input() sensors : sensor[] = []; 
  constructor(private adminPanelService : AdminPanelMainService, private spinner : NgxSpinnerService, private _snackBar : MatSnackBar) { }

  ngOnInit() {
    this.nullvalueFrameworkComponents = {
      nullvalueEditor : NullValueComponent
    };
    this.sensorColumns = [
      {headerName : 'Model', field:'sensor_model'},
      {headerName : 'Maximum', field:'sensor_threshold_max', editable:true, sortable:true, valueParser: numberParser},
      {headerName : 'Minimum', field:'sensor_threshold_min', editable:true, sortable:true, valueParser: numberParser},
    ]
    this.rowData = [];
  }
  ngOnChanges(){
    if (this.sensors.length > 0) {
      this.rowData = this.sensors;  
    }else{
      this.rowData = []
    }
  }
  onNodeDetailGridReady(params) {
    this.nodeDetailGridApi = params.api;
    this.nodeDetailColumnApi = params.columnApi
    this.nodeDetailGridApi.sizeColumnsToFit();
  }

  onCellValueChange(params){
    let sensor : sensor = params.data;
    this.spinner.show();
    this.adminPanelService.updateSensor(sensor).subscribe(
      (data) => {
        this.spinner.hide();
        if (data === "001") {
          this._snackBar.openFromComponent(SuccessSnackberComponent, {data:'Successfully updated sensor', duration:3000});
        } else {
          this.adminPanelService.getError(data)
        }
      },
      (error) => {
        console.error(error);
      }
    );
    console.log(params);
  }

}

function numberParser(params){
  return Number(params.newValue)
}
