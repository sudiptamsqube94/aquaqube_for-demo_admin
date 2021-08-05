import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromLogin from '../../../../state/app.reducer';
import { DashbordMainService } from '../../dashbord-main.service';
import { payload, segment } from '../../model/customerDashboard';
import { node } from 'src/app/modules/admin-panel/model/gateway';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-branch-devices',
  templateUrl: './branch-devices.component.html',
  styleUrls: ['./branch-devices.component.scss']
})
export class BranchDevicesComponent implements OnInit {

  branch_id;
  customer_id : number;
  payload : payload;
  segments : segment[];
  message : string;
  checked: boolean = true;
  autoRefresh: boolean=true;
  searchForm : FormGroup;
  filteredSegment : Observable<segment[]>;
  constructor(private route : ActivatedRoute, private store : Store<fromLogin.State>, private dashboardService : DashbordMainService, private router: Router, private spinner : NgxSpinnerService, private fb : FormBuilder) { }

  ngOnInit() {
    // setTimeout( ()=> this.spinner.show(), 100);
    this.searchForm = this.fb.group({
      searchField : ''
    });
    this.branch_id = this.route.snapshot.queryParamMap.get('branch_id');
    this.branch_id = +this.branch_id;
    console.log("branchid",this.branch_id);
    this.store.pipe(select(fromLogin.getUserDetail)).subscribe(
      userDetails => {
        this.customer_id = userDetails.customer_id;
        this.payload = {
          customer_branch_id : this.branch_id,
          customer_id : this.customer_id
        }
      }
    )
    this.spinner.show()
    this.dashboardService.getAllNodesByBranch(this.payload).subscribe(
    
      (data) => {
        console.log("=>",data);
        this.segments = data;
        this.message = "No nodes to show"
        this.filteredSegment = this.searchField.valueChanges.pipe(
          startWith(''),
          map( value => value ? this._filterSegment(value) : this.segments.slice())
        )
        this.spinner.hide()
      },
      (error) => {
        console.log(error);
        this.spinner.hide()
      }
    );
    
  }

  goBack(){
    this.router.navigate(['/mobile-locations'])
  }
  // gotoGraph(node : node){
  //   this.router.navigate(['/mobile-graphs'], {queryParams : {node_id : node.uid,branch_id:this.branch_id}});
  // }

  applyFilter(value : string){
    console.log(value);
    
  }
  private _filterSegment( value ?: string) : segment[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.segments.filter( m => ((m.segment_name).toLowerCase().includes(filterValue)));
    }
  }

  
  public get searchField() : FormControl {
    return <FormControl>this.searchForm.get('searchField')
  }
  sensorRefresh(toggle: boolean){
    this.autoRefresh=toggle;
  }
  
}


