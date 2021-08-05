import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import {
  CustomerDashBoard,
  customerSupport,
  segment,
  Notifications,
} from "./model/customerDashboard";
import { Customer } from "../admin-panel/model/customermodel";
@Injectable({
  providedIn: "root",
})
export class DashbordMainService {
  constructor(private http: HttpClient) {}

  getGraphData(type): Observable<any> {
    console.log(environment.dataGraphUrl + type + "\"'");
    return this.http.get<any>(environment.dataGraphUrl + type + "\"'");
  }

  getCustomerAssignData(id: number): Observable<CustomerDashBoard[]> {
    return this.http.get<CustomerDashBoard[]>(
      environment.customerdeviceAssignUrl + id + "?format=json"
    );
  }

  getSensorData(id: number): Observable<any[]> {
    return this.http.get<any[]>(environment.getADevice + id + "?format=json");
  }
  getCustomerNode(customer_id: number): Observable<any[]> {
    return this.http.post<any[]>(environment.getNodeUrl, {
      customer_id: customer_id,
    });
  }
  postSupport(data: customerSupport): Observable<any> {
    return this.http.post<any>(environment.postSupportUrl, data);
  }
  getACustomer(id: number): Observable<Customer> {
    return this.http.post<Customer>(environment.getACustomerUrl, {
      customer_id: id,
    });
  }
  getCustomerBranch(customer_id: number): Observable<any> {
    return this.http.post<any>(environment.getCustomerBranchUrlforMobile, {
      customer_id: customer_id,
    });
  }
  getAllNodesByBranch(data): Observable<any> {
    return this.http.post(environment.getAllNodesByBranchUrl, data);
  }
  getAllNodesByCustomerId(data): Observable<any> {
    return this.http.post<any>(environment.getAllNodesByCustomerId, {
      customer_id: data,
    });
  }
  getAllNodeSensorGateway(id: number): Observable<any> {
    return this.http.post<any>(environment.GetAllGateWayNodeSensonUrl, {
      customer_id: id,
    });
  }

  getSummaryView(id: number): Observable<any> {
    return this.http.get(environment.summaryViewUrl + id);
  }
  getNodeData(payload): Observable<any> {
    // let d: any[] = ["'2000000'", "'5'"];
    // let statement =
    //   "select last(*) from test where node_uid={0} and sensor_type={1}";
    // statement = this.formatString(statement, payload);
    // console.log(statement);
    return this.http.post(environment.getData, payload);
  }
  getNodeDatas(payload): Observable<any> {
    let d: any[] = ["'2000000'", "'5'"];
    let statement = "select * from test where node_uid={0} and sensor_type={1}";
    statement = this.formatString(statement, payload);
    console.log(statement);
    return this.http.get(environment.nodeDataUrl + statement);
  }
  getAllNotification(customer, index): Observable<any> {
    return this.http.post(environment.getNotification, {
      index: index,
      customer_id: customer,
    });
  }

  getNotificationDetails(data): Observable<Notifications> {
    return this.http.post(environment.getNotificationDetails, {
      node_uid: data.node_uid,
      mac: data.mac_address,
    });
  }

  getNodeThreshold(node_uid: string): Observable<any> {
    console.log("node id from service: ", node_uid);
    return this.http.post(environment.getSensorThresholdUrl, {
      node_uid: node_uid,
    });
  }

  formatString(mainString: string, args: string[]): string {
    var tags = Array.prototype.slice.call(args, 1);
    return mainString.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != "undefined" ? args[number] : match;
    });
  }

  getSensorsByUID(node_uid): Observable<any> {
    return this.http.post(environment.getSensorsByNodeUidUrl, {
      uid: node_uid,
    });
  }
  getMapData(): Observable<any> {
    return this.http.post<any>(environment.getMapData, {});
  }
}
