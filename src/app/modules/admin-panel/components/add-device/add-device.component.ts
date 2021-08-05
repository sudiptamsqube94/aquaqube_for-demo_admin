import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatAutocompleteSelectedEvent } from '@angular/material';
import { Device } from '../../model/customermodel';
import { AdminPanelMainService } from '../../admin-panel-main.service';
import { SuccessSnackberComponent } from 'src/app/modules/shared/components/success-snackber/success-snackber.component';
import { gateway, node } from '../../model/gateway';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {

  adddeviceForm : FormGroup;
  gateway : gateway;
  nodeList : node[] = [];
  nodeOptions : node[] = [];
  removable = true;
  selectable = true;
  separatorKeysCodes : number[] = [];
  constructor(private fb : FormBuilder, public dialogRef : MatDialogRef<AddDeviceComponent>, @Inject(MAT_DIALOG_DATA) public data: gateway, private adminService: AdminPanelMainService, private _snackBar : MatSnackBar, private spinner : NgxSpinnerService) { 
    this.gateway = data;
  }

  ngOnInit() {
    // setTimeout(()=> {this.spinner.show()}, 100);
    this.adddeviceForm = this.fb.group({
      gateway_name : ['',[Validators.required]],
      uid : ['',[Validators.required]],
    });
    this.adminService.getNodeByStatus().subscribe(
      (data) => {
        this.nodeOptions = data;
        if (this.gateway && this.gateway.gateway_id > 0) {
          this.adddeviceForm.patchValue(this.gateway);
          this.nodeList = this.nodeList.concat(this.gateway.nodes);
          this.nodeList.forEach(element => {
            this.nodeOptions.filter(m => m.node_id != element.node_id)
          });
        }
        console.log(data);
        this.spinner.hide();
      },
      (error) => {
        console.error(error);
        this.spinner.hide()
      }
    );
  }

  closeDialog(){
    this.dialogRef.close()
  }

  onSubmit(form){
    if (this.gateway && this.gateway.gateway_id > 0) {
      this.gateway.gateway_name = form.controls.gateway_name.value,
      this.gateway.uid = form.controls.uid.value,
      this.gateway.nodes = this.nodeList
      console.log('add device',this.gateway);
      this.adminService.updateGateway(this.gateway).subscribe(
        (data) => {
          console.log(data);
          this.dialogRef.close('success');
          if (data === "001") {
            this._snackBar.openFromComponent(SuccessSnackberComponent, {data:'Successfully updated gateway', duration:3000})
          } else {
            this.adminService.getError(data)
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.gateway = {
        gateway_name : form.controls.gateway_name.value,
        uid : form.controls.uid.value,
        nodes : this.nodeList
      }
      console.log(this.gateway)
      this.adminService.createGateway(this.gateway).subscribe(
        (data) => {
          console.log(data);
          this.dialogRef.close('success')
          if (data === "001") {
            this._snackBar.openFromComponent(SuccessSnackberComponent, {data:'Successfully created gateway', duration:3000})
          }else{
            this.adminService.getError(data)
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  select(event : MatAutocompleteSelectedEvent) {
    this.nodeList.push(event.option.value)
    this.nodeOptions = this.nodeOptions.filter( m => m.node_id != event.option.value.node_id);
    console.log(this.nodeOptions);
    console.log(this.nodeList);
  }

  remove(node : node) {
    this.nodeList = this.nodeList.filter( m => m.node_id != node.node_id);
    this.nodeOptions.push(node);
    console.log(this.nodeList);
    console.log(this.nodeOptions);
  }
}
