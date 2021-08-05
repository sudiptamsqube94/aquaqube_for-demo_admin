import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { CustomerDashBoard } from "../../model/customerDashboard";
import { DashbordMainService } from "../../dashbord-main.service";
import { NgxSpinnerService } from "ngx-spinner";
import {
  DeviceAssignment,
  Devices,
} from "src/app/modules/admin-panel/model/customermodel";
import { Store, select } from "@ngrx/store";
import * as formLogin from "../../../../state/app.reducer";

@Component({
  selector: "app-device-list",
  templateUrl: "./device-list.component.html",
  styleUrls: ["./device-list.component.scss"],
})
export class DeviceListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @Input() deviceList: any;

  @Output() Buttonclick = new EventEmitter<number>();
  @Output() EmitMac = new EventEmitter<string>();
  @Output() SensorList = new EventEmitter<any>();
  @Input() customerAssignData: CustomerDashBoard[];
  devices: Devices[];
  allNodes: any;
  customerId: number;
  displayedColumns: string[] = [
    "select",
    "uid",
    "node_effective_from",
    "list_of_node",
  ];
  dataSource = new MatTableDataSource<Devices>();
  sensorValue: any[];
  SelectedDevice: CustomerDashBoard = {
    device_id: 0,
  };

  constructor(
    private dashbordmainService: DashbordMainService,
    private spinner: NgxSpinnerService,
    private store: Store<formLogin.State>
  ) {}

  ngOnInit() {
    this.devices = [];
    this.store.pipe(select(formLogin.getUserDetail)).subscribe((userDetail) => {
      if (userDetail) {
        this.customerId = userDetail.user_id;
        console.log(this.customerId);
        this.spinner.show();
        this.dashbordmainService
          .getAllNodesByCustomerId(this.customerId)
          .subscribe(
            (data) => {
              this.dataSource.data = data;
              console.log("data Source 1", data);
            },
            (error) => {
              console.log(error);
            }
          );
      }
    });
  }

  ngOnChanges() {
    // this.dataSource.data = this.customerAssignData;
    console.log(this.deviceList);
    this.devices = [];
    this.deviceList.gateway.forEach((data) => {
      data.nodes.forEach((data2) => {
        this.devices.push({
          uid: data2.uid,
          node_effective_from: data2.node_effective_from,
          list_of_node: data2.sensors.length,
          sensor: data2.sensors,
        });
      });
    });
    this.dataSource.data = this.devices;
    console.log("data source 2", this.devices);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getSensor(sensor: any) {
    this.SensorList.emit(sensor);
  }
}
