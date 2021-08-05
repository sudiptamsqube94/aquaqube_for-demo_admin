import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  CustomerDashBoard,
  segment,
  payload,
} from "../../model/customerDashboard";
import { DashbordMainService } from "../../dashbord-main.service";
import { Store, select } from "@ngrx/store";
import * as fromLogin from "../../../../state/app.reducer";
import { NgxSpinnerService } from "ngx-spinner";
import { Branch } from "src/app/modules/admin-panel/model/customermodel";

@Component({
  selector: "app-customer-branch-details",
  templateUrl: "./customer-branch-details.component.html",
  styleUrls: ["./customer-branch-details.component.scss"],
})
export class CustomerBranchDetailsComponent implements OnInit {
  @Input() customerAssignData: CustomerDashBoard[];

  customerId: number;
  branches: Branch[];
  segments: segment[];
  payload: payload;
  branchClick: number;
  segmentClick: number;
  @Output() DeviceList = new EventEmitter<any>();
  constructor(
    private store: Store<fromLogin.State>,
    private dashboardService: DashbordMainService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.store
      .pipe(select(fromLogin.getUserDetail))
      .subscribe((userDetails) => {
        if (userDetails) {
          console.log(userDetails, "userdetails");
          this.customerId = 1;
          this.spinner.show();
          this.dashboardService.getCustomerBranch(this.customerId).subscribe(
            (data) => {
              console.log(data);
              this.branches = data;
              this.spinner.hide();
            },
            (error) => {
              console.log(error);
              this.spinner.hide();
            }
          );
        }
      });
  }
  getBranch(branch: number) {
    this.branchClick = branch;
    this.payload = {
      customer_branch_id: branch,
      customer_id: this.customerId,
    };
    this.spinner.show();
    this.dashboardService.getAllNodesByBranch(this.payload).subscribe(
      (data) => {
        this.segments = data;
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }
  getGateway(gateWay: any) {
    //console.log(gateWay);
    this.segmentClick = gateWay.segment_id;
    this.DeviceList.emit(gateWay);
  }
}
