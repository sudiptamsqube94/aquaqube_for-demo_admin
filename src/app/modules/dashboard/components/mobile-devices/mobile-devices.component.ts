import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as formLogin from '../../../../state/app.reducer';
import { DashbordMainService } from '../../dashbord-main.service';
import { node } from 'src/app/modules/admin-panel/model/gateway';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { segment } from '../../model/customerDashboard';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-mobile-devices',
  templateUrl: './mobile-devices.component.html',
  styleUrls: ['./mobile-devices.component.scss']
})
export class MobileDevicesComponent implements OnInit {
  customerId : number;
  allDatas: any;
  message : string;
  segments : segment[];
  searchForm : FormGroup;
  checked: boolean = true;
  autoRefresh: boolean=true;
  filteredSegment : Observable<segment[]>;
  constructor(private store : Store<formLogin.State>,private dashbordMainService: DashbordMainService, private router : Router, private spinner: NgxSpinnerService,private fb : FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchField : ''
    });
    this.store.pipe(select(formLogin.getUserDetail)).subscribe(
      userDetail => {
        if (userDetail) {
          this.customerId = userDetail.customer_id;
          console.log(this.customerId);
          this.spinner.show()
          this.dashbordMainService.getAllNodeSensorGateway(this.customerId).subscribe(
            (data)=>{
              this.allDatas=data;
              this.segments = data;
              console.log(this.allDatas);
              this.message = "No nodes to show";
              this.filteredSegment = this.searchField.valueChanges.pipe(
                startWith(''),
                map( value => value ? this._filterSegment(value) : this.segments.slice())
              )
              this.spinner.hide();
            },
            (error)=>{
              console.error(error);
              this.spinner.hide();
            }
          ) 
        }
      }
    );
  }
  // goToGraph(node : node){
  //   this.router.navigate(['/mobile-graphs'], {queryParams : {node_id : node.uid}});
  // }
  applyFilter(value : string){
    console.log(value);
    
  }
  private _filterSegment( value ?: string) : segment[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.segments.filter( m => (m.segment_name).toLowerCase().includes(filterValue));
    }
  }

  
  public get searchField() : FormControl {
    return <FormControl>this.searchForm.get('searchField')
  }
  sensorRefresh(toggle: boolean){
    this.autoRefresh=toggle;
  }
}
