import { Component, OnInit, Input } from '@angular/core';
import { Device, DeviceMonitor } from '../../model/customermodel';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeviceActiveRendererComponent } from 'src/app/modules/shared/components/device-active-renderer/device-active-renderer.component';
import { DeviceHealthRendererComponent } from 'src/app/modules/shared/components/device-health-renderer/device-health-renderer.component';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { DateTimeRendererComponent } from 'src/app/modules/shared/components/date-time-renderer/date-time-renderer.component';
import { NullValueComponent } from 'src/app/modules/shared/components/null-value/null-value.component';
import { MatSnackBar } from '@angular/material';
import { SuccessSnackberComponent } from 'src/app/modules/shared/components/success-snackber/success-snackber.component';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-device-management',
  templateUrl: './device-management.component.html',
  styleUrls: ['./device-management.component.scss']
})
export class DeviceManagementComponent implements OnInit {
  @Input()deviceName:string;
  @Input()deviceId:number;
  deviceHealth: DeviceMonitor[] = []
  public defaultcolDefs;
  private deviceMonitorGridApi;
  private deviceMonitorColumnApi;

  constructor(private spinner: NgxSpinnerService, private adminService: AdminPanelMainService,  private _sanckBar : MatSnackBar) {
    this.defaultcolDefs = { resizable: true }
   }

  columnDefs = [
    { headerName: 'Device Name', field:'device_name', sortable:true, filter:'agTextColumnFilter' },
    { headerName: 'Device MAC Address', field:'device_mac', sortable:true, filter:'agTextColumnFilter' },
    { headerName: 'Active', field:'device_activated', sortable:true, cellRenderer:'activeRenderer'},
    { headerName: 'Health', field:'device_health', cellRenderer:'healthRenderer'},
    { headerName: 'Last Heart Beat', field:'device_last_heartbeat',  sortable:true, cellRenderer:'dateRenderer'},
    { headerName: 'Data Collection Frequency', field:'data_collection_frequency', editable:true, valueParser:numberParser, cellEditor: 'nullvalueEditor'},
    { headerName: 'Data Sending Frequency', field:'data_sending_frequency', editable:true, resizable:true, valueParser:numberParser, cellEditor: 'nullvalueEditor'}
  ];
  
  
  frameworkComponents = {
    activeRenderer: DeviceActiveRendererComponent,
    healthRenderer: DeviceHealthRendererComponent,
    dateRenderer: DateTimeRendererComponent,
    nullvalueEditor : NullValueComponent
  }

  ngOnInit() {

    interval(30000)
      .pipe(
        startWith(0),
        switchMap( () => this.adminService.getDeviceHealth())
      ).subscribe(
        (data) => {
          console.log(1)
          this.deviceHealth = data
          this.deviceHealth.forEach( element => {
            console.log(element.device_last_heartbeat)
            if (element.device_last_heartbeat != null) {
              let present_date = new Date();
              let diff_date: number;
              diff_date = present_date.getTime() - new Date(element.device_last_heartbeat).getTime();
              console.log(diff_date)
            }
          })
        },
        (error) => {
          console.log(error)
        }
      );

    // this.adminService.getDeviceHealth().subscribe(
    //   (data) => {
    //     this.spinner.show();
    //     console.log(data)
    //     this.deviceHealth = data
    //     this.spinner.hide();
    //   },
    //   (error) => {
    //     console.log(error)
    //   }
    // );
  }

  onDeviceGridReady(params){
    this.deviceMonitorGridApi = params.api;
    this.deviceMonitorColumnApi = params.columnApi;
    this.deviceMonitorGridApi.sizeColumnsToFit()
  }

  onCellValueChange(params){
    this.spinner.show()
    this.adminService.updateFrequency(params.data).subscribe(
      (data) => {
        console.log(data)
        // alert('updated successfully')
        if (data == "001") {
          this._sanckBar.openFromComponent(SuccessSnackberComponent,{data: "Update Device Monitor", duration: 3000});
        } 
        else {
          this.adminService.getError(data);
        }
        this.spinner.hide()
      },
      (error) => {
        console.log(error)
        this.spinner.hide()
      }
    );
  }
}

function numberParser(params){
  return Number(params.newValue);
}