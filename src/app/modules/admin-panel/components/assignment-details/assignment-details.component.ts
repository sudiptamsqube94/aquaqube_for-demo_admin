import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Device, DeviceAssignment } from '../../model/customermodel';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DateTimeRendererComponent } from 'src/app/modules/shared/components/date-time-renderer/date-time-renderer.component';
import { MatTableDataSource } from '@angular/material';
import { assignmentinfo } from '../../model/gateway';

@Component({
  selector: 'app-assignment-details',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.scss']
})
export class AssignmentDetailsComponent implements OnInit {
  @Output() editClicked = new EventEmitter<DeviceAssignment>();
  @Output() buttonClick = new EventEmitter<number>();
  @Output() assignData = new EventEmitter<assignmentinfo>();
  @Input() device:Device;
  @Input() assignInfos: assignmentinfo[];
  private rowSelection: string;
  private columnDefs;
  private selectedRow: DeviceAssignment;
  private assignmentGridApi;
  private assignmentGridColumnApi;
  displayedColumns = ['select', 'customer_name', 'customer_branch_name', 'branch_unit','gateway_name', 'gateway_assign_effective_from', 'gateway_assign_effective_to'];
  dataSource = new MatTableDataSource<assignmentinfo>();
  selectedAssignment : assignmentinfo = {
    gateway_assign_id : 0
  }
  assignedInfos : assignmentinfo[] = [];
  constructor(private adminService: AdminPanelMainService, private spinner: NgxSpinnerService) { }

  
  ngOnInit() {
    setTimeout(() => {this.spinner.show()}, 100);
    this.adminService.getAllAssignedInfo().subscribe(
      (data) =>{
        console.log(data);
        this.dataSource.data = data
        this.spinner.hide();
      },
      (error) => {
        console.error(error);
        this.spinner.hide();
      }
    );  
  }
  ngOnChanges(){
    this.dataSource.data = this.assignInfos
  }
  InitializeClick(value){
    this.buttonClick.emit(value)
  }
  onAssignmentGridReady(params){
    this.assignmentGridApi = params.api;
    this.assignmentGridColumnApi = params.columnApi;
  }
  onSelectionChanged(value){
    this.selectedRow = this.assignmentGridApi.getSelectedRows()[0];
    console.log(this.selectedRow);
  }

  InitializeEdit(){
    this.editClicked.emit(this.selectedRow)
  }

  applyFilter(value : string){
    this.dataSource.filter = value.trim().toLowerCase();
  }

  viewDetails(value){
    console.log(value);
    this.selectedAssignment = value;
    this.assignData.emit(this.selectedAssignment);
  }
}
