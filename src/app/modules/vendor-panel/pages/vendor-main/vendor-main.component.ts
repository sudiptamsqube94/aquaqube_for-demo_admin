import { Component, OnInit } from '@angular/core';
import { VendorMainService } from '../../vendor-main.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICustomerAssignmenrInfo } from 'src/app/modules/admin-panel/model/vendormodel';

@Component({
  selector: 'app-vendor-main',
  templateUrl: './vendor-main.component.html',
  styleUrls: ['./vendor-main.component.scss']
})
export class VendorMainComponent implements OnInit {

  customer : ICustomerAssignmenrInfo[] = [];
  constructor(private vendorPanelService: VendorMainService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show()
    this.vendorPanelService.getCustomerManaged(9).subscribe(
      (data) => {
        console.log(data);
        this.customer = data;
        setTimeout(()=>{
          this.spinner.hide()
        }, 3000);
        // this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

}
