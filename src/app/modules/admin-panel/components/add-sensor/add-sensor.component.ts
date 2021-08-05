import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HighlightDelayBarrier } from 'blocking-proxy/built/lib/highlight_delay_barrier';
import { sensor } from '../../model/gateway';
import { SuccessSnackberComponent } from 'src/app/modules/shared/components/success-snackber/success-snackber.component';
import { Sensor } from '../../model/customermodel';
import { domain } from '../../model/domain';

@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.scss']
})
export class AddSensorComponent implements OnInit {

  sensorForm : FormGroup;
  sensorType: domain;
  sensor: sensor;
  constructor(private fb : FormBuilder, private dialogref : MatDialogRef<AddSensorComponent>, private adminPanelService: AdminPanelMainService, private spinner: NgxSpinnerService, private _snackBar : MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: sensor) {
    this.sensor = data;
   }

  ngOnInit() {
    this.sensorForm = this.fb.group({
      sensor_type:['', [Validators.required]],
      sensor_model: ['', [Validators.required]],
      sensor_make:['', [Validators.required]],
      sensor_desc:[''],
      sensor_threshold_max:[''],
      sensor_threshold_min:[''],
      calibration_time: ''
    })
    setTimeout(() => {this.spinner.show();},100);
    this.adminPanelService.getSensorType().subscribe(
      (data) => {
        this.sensorType = data;
        console.log(this.sensorType)
        if (this.sensor && this.sensor.sensor_id > 0) {
          console.log("Patching");
          
          this.sensorForm.patchValue(this.sensor)
        }
        setTimeout(() => {this.spinner.hide();},100);
      },
      (error) => {
        console.error(error);
        setTimeout(() => {this.spinner.hide();},100);
      }
    );

    
  }
  closeDialog(){
    this.dialogref.close()
  }

  onSubmit(form){
    if (this.sensor && this.sensor.sensor_id > 0) {
      this.sensor.sensor_make = form.controls.sensor_make.value,
      this.sensor.sensor_model = form.controls.sensor_model.value,
      this.sensor.sensor_type = form.controls.sensor_type.value,
      this.sensor.sensor_desc = form.controls.sensor_desc.value,
      this.sensor.sensor_threshold_max = form.controls.sensor_threshold_max.value,
      this.sensor.sensor_threshold_min = form.controls.sensor_threshold_min.value
      console.log(this.sensor);
      this.adminPanelService.updateSensor(this.sensor).subscribe(
        (data) => {
          this.dialogref.close('success');
          if (data === "001") {
            this._snackBar.openFromComponent(SuccessSnackberComponent, {data: 'Successfully updated sensor information', duration:3000});
          } else {
            this.adminPanelService.getError(data);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.sensor = {
      sensor_type : form.controls.sensor_type.value,
      sensor_make : form.controls.sensor_make.value,
      sensor_model : form.controls.sensor_model.value,
      sensor_desc : form.controls.sensor_desc.value,
      sensor_threshold_max : form.controls.sensor_threshold_max.value,
      sensor_threshold_min : form.controls.sensor_threshold_min.value,
    }
    this.adminPanelService.createSensor(this.sensor).subscribe(
      (data) => {
        this.dialogref.close('success')
        if (data === "001") {
          this._snackBar.openFromComponent(SuccessSnackberComponent, {data:'Sensor stored successfully', duration:3000})
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
}
