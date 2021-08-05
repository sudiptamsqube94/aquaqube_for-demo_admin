import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer, Domaindata, Device, DeviceMonitor, DeviceAssignment, CustomerAssignment } from './model/customermodel';
import { Observable, from } from 'rxjs';
import { Vendor } from './model/vendormodel';
import { MatSnackBar } from '@angular/material';
import { ErrorSnackberComponent } from '../shared/components/error-snackber/error-snackber.component';
import { environment } from '../../../environments/environment';
import { sensor, node, gateway, assignmentinfo } from './model/gateway';
import { puts } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelMainService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  createCustomer(form: Customer){
    return this.http.post(environment.createCustomerUrl, form);
  }

  getAllCustomer(): Observable<Customer[]>{
    return this.http.get<Customer[]>(environment.getAllCustomerUrl)
  }

  updateCustomer(form : Customer){
    console.log('data',form);
    return this.http.put(environment.updateCustomerUrl, form)
  }

  getACustomer(id:number):Observable<Customer>{
    return this.http.post<Customer>(environment.getACustomerUrl, {customer_id: id});
  }

  getAddressType() : Observable<Domaindata[]> {
    return this.http.post<Domaindata[]>(environment.getdomainUrl,{domain_type: 'Address'});
  } 

  getCountryCode() : Observable<Domaindata[]> {
    return this.http.post<Domaindata[]>(environment.getdomainUrl,{domain_type: 'country_code'});
  }

  getLegalInfoType() : Observable<Domaindata[]> {
    return this.http.post<Domaindata[]>(environment.getdomainUrl,{domain_type: 'Legal_info'});
  }

  getCustomerType() : Observable<Domaindata[]> {
    return this.http.post<Domaindata[]>(environment.getdomainUrl,{domain_type: 'Customer_type'});
  }
  getAllDevice():Observable<Device[]>{
    return this.http.get<Device[]>(environment.getAllDeviceUrl)
  }

  createDevice(form: Device){
    return this.http.post(environment.createDeviceUrl, form)
  }

  updateDevice(form: Device){
    return this.http.put(environment.updateDeviceUrl, form);
  }

  getAllVendor() : Observable<Vendor[]> {
    return this.http.get<Vendor[]>(environment.getAllVendorUrl);
  } 

  createVendor(form : Vendor) {
    return this.http.post(environment.postVendorUrl, form);
  }

  updateVendor(form : Vendor) {
    return this.http.put(environment.vendorUpdateUrl, form);
  }

  getAVendorDetails(id : number) : Observable<Vendor> {
    return this.http.post<Vendor>(environment.getAvendorUrl, {vendor_id : id});
  }

  getDeviceHealth() : Observable<DeviceMonitor[]>{
    return this.http.get<DeviceMonitor[]>(environment.getDeviceHealthUrl)
  }

  getCustomerBranch(id: number) : Observable<any[]>{
    return this.http.post<any[]>(environment.getCustomerBranchUrl, {customer_id: id});
  }

  getCustomerNameandId() : Observable<any[]>{
    return this.http.get<any[]>(environment.getCustomerandIdUrl);
  }

  updatedDeviceAssign(form: DeviceAssignment) {
    return this.http.put(environment.assignDevice, form)
  }

  // getAssignInfo(id:number): Observable<DeviceAssignment[]>{
  //   return this.http.get<DeviceAssignment[]>(environment.getAssignInfoUrl+id+'?format=json');
  // }
  getVendorNameId(): Observable<any[]>{
    return this.http.get<any[]>(environment.getVendorNameIdUrl);
  }

  postVendorManage(form: CustomerAssignment){
    return this.http.post(environment.createVendorManage, form)
  }

  getAssignmentHistory(id: number) : Observable<CustomerAssignment[]>{
    return this.http.get<CustomerAssignment[]>(environment.assignMentHistory+id+'?format=json')
  }

  updateFrequency(form: DeviceMonitor){
    return this.http.put(environment.updateFreqUrl, form)
  }

  getAdevice(id: number) : Observable<Device[]> {
    return this.http.get<Device[]>(environment.getADevice+id+'?format=json');
  }

  getSensorType() : Observable<any>{
    return this.http.post<any>(environment.getdomainUrl,{domain_type: "sensor"});
  }

  createSensor(sensor: sensor) : Observable<any> {
    return this.http.post(environment.createSensorUrl,sensor);
  }

  getAllSensor() : Observable<any> {
    return this.http.get(environment.getallSensorUrl);
  }

  updateSensor(sensor: sensor) : Observable<any> {
    return this.http.put(environment.updateSensorUrl, sensor);
  }

  createNode(node : node) : Observable<any>{
    return this.http.post(environment.createNodeUrl, node);
  }

  getAllnodes() : Observable<any> {
    return this.http.get(environment.getallNodesUrl);
  }

  updateNode(node : node) : Observable<any> {
    return this.http.put(environment.updateNodeUrl, node);
  }

  gateAllGateways() : Observable<any> {
    return this.http.get(environment.getallGatewayUrl);
  }

  createGateway(gateway : gateway) : Observable<any> {
    return this.http.post(environment.createGatewayUrl, gateway)
  }

  updateGateway(gateway : gateway) : Observable<any> {
    return this.http.put(environment.updateGatewayUrl, gateway);
  }

  getSensorsByStatus() : Observable<any> {
    return this.http.get(environment.getSensorsByStatus);
  }

  getNodeByStatus() : Observable<any> {
    return this.http.get(environment.getNodeByStatus);
  }

  getGatewayByStatus() : Observable<any> {
    return this.http.get(environment.getGatewayByStatus);
  }

  getAllAssignedInfo() : Observable<any> {
    return this.http.get(environment.getAllAssignedInfo);
  }

  assignGateway(assignInfo  : assignmentinfo) : Observable<any> {
   return this.http.post(environment.assignedGatewayUrl, assignInfo); 
  }

  getIndustrytype() : Observable<any> {
    return this.http.post(environment.getdomainUrl, {domain_type: "industry"});
  }
  // get error in snackbar
  getError(value : any) {
    switch (value) {
      case "301":
        this._snackBar.openFromComponent(ErrorSnackberComponent, 
          { data: "Getting Error From Database..", duration : 3000 });
      break;
      case "101":
        this._snackBar.openFromComponent(ErrorSnackberComponent,
          { data : "Duplicate Entry", duration : 3000 });
      break;
      case "501":
        this._snackBar.openFromComponent(ErrorSnackberComponent,
          { data:"Type Error", duration : 3000 });
      break;
      case "502":
        this._snackBar.openFromComponent(ErrorSnackberComponent, 
          { data:"Key Error", duration : 3000 });
      break;
      case "503":
        this._snackBar.openFromComponent(ErrorSnackberComponent, 
          { data:"Value Error", duration : 3000 });
      break;
      case "504":
        this._snackBar.openFromComponent(ErrorSnackberComponent, 
          { data : "Attribute Error", duration : 3000});
      break;
      case "505":
        this._snackBar.openFromComponent(ErrorSnackberComponent,
          { data : "Indentation Error", duration : 3000});
      break;
      case "404":
        this._snackBar.openFromComponent(ErrorSnackberComponent, 
          { data : "Not Fouund Error", duration : 3000 });
      break;
      case "405":
        this._snackBar.openFromComponent(ErrorSnackberComponent,
          { data : "File Not found Error", duration : 3000 });
      break;
      case "406":
        this._snackBar.openFromComponent(ErrorSnackberComponent,
          { data : "File Exist Error", duration : 3000 });
      break;
      case "601":
        this._snackBar.openFromComponent(ErrorSnackberComponent,
          { data : "Syntax Error", duration : 3000 });
      break;
      case "701":
        this._snackBar.openFromComponent(ErrorSnackberComponent,
          { data : "Broken Pipe Error", duration : 3000 });
      break;
      case "506":
        this._snackBar.openFromComponent(ErrorSnackberComponent,
          { data : "Invalid Data", duration : 3000 });
      break;
      case "901":
        this._snackBar.openFromComponent(ErrorSnackberComponent,
          {data:"Sensor Not Found", duration:3000});
      break;
      case "902":
        this._snackBar.openFromComponent(ErrorSnackberComponent,
          { data:'Gateway is not available', duration : 3000});
      break;
    }
  }
  // getGraphData() : Observable<any> {
  //   console.log("calling : " + environment.graphUrl+' sensor');
  //   return this.http.get<any>(environment.graphUrl+' sensor');
  // }
}
