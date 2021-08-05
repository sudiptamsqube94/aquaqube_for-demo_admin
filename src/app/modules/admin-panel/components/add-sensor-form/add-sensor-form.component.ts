import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Sensor } from '../../model/customermodel';

@Component({
  selector: 'app-add-sensor-form',
  templateUrl: './add-sensor-form.component.html',
  styleUrls: ['./add-sensor-form.component.scss']
})
export class AddSensorFormComponent implements OnInit {

  sensorForm: FormGroup;
  formData: Sensor;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddSensorFormComponent>) { }

  ngOnInit() {
    this.sensorForm = this.fb.group({
      sensor_name: ['',[Validators.required] ],
      sensor_type: ['', [Validators.required]],
      sensor_threshold_max: [''],
      sensor_threshold_min: ['', [Validators.required]],
    })
  }
  closeDialog(){
    this.dialogRef.close()
  }

  onSubmit(form){
    this.formData = {
      sensor_name: form.controls.sensor_name.value,
      sensor_type: form.controls.sensor_type.value,
      sensor_threshold_max: form.controls.sensor_threshold_max.value,
      sensor_threshold_min: form.controls.sensor_threshold_min.value
    }
    this.dialogRef.close(this.formData)
  }
}
