import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { DashbordMainService } from '../../dashbord-main.service';
import { historyy } from '../../model/customerDashboard';

@Component({
  selector: 'app-bridge-history',
  templateUrl: './bridge-history.component.html',
  styleUrls: ['./bridge-history.component.scss']
})
export class BridgeHistoryComponent implements OnInit {
  displayedColumns: string[] = [
    "node_uid",
    "sensor",
    "_value",
    "_time"
  ];
  @ViewChild("DetailsSort", { static: true }) DetailsSort: MatSort;
  @ViewChild("DetailsPaginator", { static: true })
  DetailsPaginator: MatPaginator;
  dataSource: MatTableDataSource<historyy>;
  constructor( private dialogRef: MatDialogRef<BridgeHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,private dashbordmainService: DashbordMainService) { }
  ngOnInit() {
    this.dashbordmainService.getBridgeHistory(this.data).subscribe
    (
      (data)=>{
        if(!!data && data.length> 0){
          console.log(data);
          this.dataSource = new MatTableDataSource<historyy>(
            data
          );
          this.dataSource.sort = this.DetailsSort;
          this.dataSource.paginator = this.DetailsPaginator;

          
        }
      },
      err=>{
        console.log(err);
        
      }
    )
  }
  cancel(){
    this.dialogRef.close("result");
  }
  convert(data: historyy): boolean{
    return data._value > +data.max_value? true: false;
  }

}
