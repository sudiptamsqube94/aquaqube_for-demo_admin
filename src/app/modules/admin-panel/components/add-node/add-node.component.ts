import { Component, OnInit, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent } from '@angular/material';
import { node, sensor } from '../../model/gateway';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { SuccessSnackberComponent } from 'src/app/modules/shared/components/success-snackber/success-snackber.component';
import { NgxSpinnerService } from 'ngx-spinner';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.scss']
})
export class AddNodeComponent implements OnInit {
  nodeForm: FormGroup;
  node : node;
  filteredSensorOptions : Observable<sensor[]>;
  sensorList : sensor[] = [];
  sensorOptions : sensor[] = [];
  removable = true;
  selectable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA]
  title : string;
  industryType = [];
  constructor(private fb: FormBuilder, private dialogref : MatDialogRef<AddNodeComponent>, private adminPanelService : AdminPanelMainService, private _snackBar : MatSnackBar, private spinner : NgxSpinnerService, @Inject(MAT_DIALOG_DATA) public data : node ) {
    this.node = data
   }

  ngOnInit() {
    this.title = 'Add Node Information';
    setTimeout(() => {this.spinner.show()}, 100);
    this.nodeForm = this.fb.group({
      uid:['', [Validators.required]],
      data_collection_frequency:'',
      data_sending_frequency:'',
      sensors:'',
      industry_type:'',
      latitude: '',
      longitude: ''
    })
    
    // this.adminPanelService.getSensorsByStatus().subscribe(
    //   (data) => {
    //     this.sensorOptions = data; 
    //     if (this.node && this.node.node_id > 0) {
    //       this.title = 'Edit Node Information';
    //       this.nodeForm.patchValue(this.node);
    //       this.sensorList = this.sensorList.concat(this.node.sensors);
    //       this.sensorList.forEach(element => {
    //         this.sensorOptions.filter(m => m.sensor_id != element.sensor_id);
    //       });
    //     }
    //     this.spinner.hide();
    //   },
    //   (error) => {
    //     console.error(error);
    //     this.spinner.hide();
    //   }
    // );
    // this.adminPanelService.getIndustrytype().subscribe(
    //   (data) =>{
    //     this.industryType = data
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
    forkJoin(
      [this.adminPanelService.getSensorsByStatus(),
      this.adminPanelService.getIndustrytype()]
    ).subscribe(
      (data) => {
        console.log(data);
        
        this.sensorOptions = data[0];
        this.industryType = data[1] 
        if (this.node && this.node.node_id > 0) {
          console.log(this.node);
          
          this.title = 'Edit Node Information';
          this.nodeForm.patchValue(this.node);
          this.sensorList = this.sensorList.concat(this.node.sensors);
          this.sensorList.forEach(element => {
            this.sensorOptions.filter(m => m.sensor_id != element.sensor_id);
          });
        }
        setTimeout(() => { this.spinner.hide(); },100);
      },
      (error)=> {
        console.error(error);
        setTimeout(() => { this.spinner.hide(); },100);
      }
    );
  }

  closeDialog(){
    this.dialogref.close()
  }

  saveNode(form) {
    if (this.node && this.node.node_id > 0) {
      this.node.uid = form.controls.uid.value,
      this.node.data_collection_frequency = form.controls.data_collection_frequency.value,
      this.node.data_sending_frequency = form.controls.data_sending_frequency.value,
      this.node.sensors = this.sensorList,
      this.node.industry_type = form.controls.industry_type.value,
      this.node.latitude = +form.controls.latitude.value,
      this.node.longitude = +form.controls.longitude.value
      console.log(this.node);
      
      this.spinner.show();
      this.adminPanelService.updateNode(this.node).subscribe(
        (data) => {
          this.dialogref.close('success');
          if (data === "001") {
            this._snackBar.openFromComponent(SuccessSnackberComponent, {data:'Successfully updated node', duration:3000})
          } else {
            this.adminPanelService.getError(data)
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.node = {
        uid:form.controls.uid.value,
        data_collection_frequency : form.controls.data_collection_frequency.value,
        data_sending_frequency : form.controls.data_sending_frequency.value,
        sensors : this.sensorList,
        industry_type : form.controls.industry_type.value,
        latitude : form.controls.latitude.value,
        longitude : form.controls.longitude.value
      }
      console.log(this.node)
      this.adminPanelService.createNode(this.node).subscribe(
        (data)=> {
          this.dialogref.close('success');
          if (data === "001") {
            this._snackBar.openFromComponent(SuccessSnackberComponent, {data:'Successfully saved node', duration:3000})
          }else{
            this.adminPanelService.getError(data);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  select(event: MatAutocompleteSelectedEvent){
    this.sensorList.push(event.option.value);
    this.sensorOptions = this.sensorOptions.filter(m => m.sensor_id != event.option.value.sensor_id);
    console.log(this.sensorList);
  }

  remove(sensor: sensor){
    this.sensorList = this.sensorList.filter(m => m.sensor_id != sensor.sensor_id);
    this.sensorOptions.push(sensor);
    console.log(this.sensorOptions);
    console.log(this.sensorList);
  }
}
