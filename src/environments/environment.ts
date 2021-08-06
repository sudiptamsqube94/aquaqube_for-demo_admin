// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
//const baseServiceUrl = "http://192.168.0.30:8000/";
const baseServiceUrl = "http://3.7.89.92:8000/";
export const environment = {
  production: false,
  createCustomerUrl: baseServiceUrl + "qubematics/customer/create/",
  updateCustomerUrl: baseServiceUrl + "qubematics/customer/update/",
  getAllCustomerUrl: baseServiceUrl + "qubematics/customer/getall/?format=json",
  getACustomerUrl: baseServiceUrl + "qubematics/customer/getacustomer/",
  getdomainUrl: baseServiceUrl + "qubematics/domain/getbytype/",

  postSupportUrl: baseServiceUrl + "qubematics/customer/createsupport/",
  //////////////////////////////////////////////////////////////////////////
  getCustomerBranchUrl:
    baseServiceUrl + "qubematics/customer/getbranchbycustomer/",
  getCustomerBranchUrlforMobile:
    baseServiceUrl + "qubematics/customer/getbranchbycustomer/",
  getCustomerandIdUrl: baseServiceUrl + "qubematics/customer/getidname/",
  //////////////////////////contact us//////////////////////////////////
  getNodeUrl: baseServiceUrl + "qubematics/gateway/getallnodes/customer/",

  /////////////////////////////////////////////////////////////////////////
  createDeviceUrl: baseServiceUrl + "qubematics/device/create/",
  updateDeviceUrl: baseServiceUrl + "qubematics/device/update/",
  getAllDeviceUrl: baseServiceUrl + "qubematics/device/getall/?format=json",
  //  getAssignInfoUrl : "http://34.93.22.112:8002/api/qubematics/gateway/assignInfo/",
  deviceAliveUrl: baseServiceUrl + "qubematics/device/alive/",
  assignDevice: baseServiceUrl + "qubematics/device/assign/",
  getDeviceHealthUrl:
    baseServiceUrl + "qubematics/device/getdevicehealth/?format=json",
  updateFreqUrl: baseServiceUrl + "qubematics/device/updatefreq/",
  getADevice: baseServiceUrl + "qubematics/device/get/",
  createNodeUrl: baseServiceUrl + "qubematics/device/createnode/",
  createSensorUrl: baseServiceUrl + "qubematics/device/createsensor/",
  getallSensorUrl: baseServiceUrl + "qubematics/device/getallsensors/",
  updateSensorUrl: baseServiceUrl + "qubematics/device/updatesensor/",
  getallGatewayUrl: baseServiceUrl + "qubematics/device/getallgateway/",
  createGatewayUrl: baseServiceUrl + "qubematics/device/creategateway/",
  updateGatewayUrl: baseServiceUrl + "qubematics/device/updategateway/",
  getallNodesUrl: baseServiceUrl + "qubematics/device/getallnodes/",
  updateNodeUrl: baseServiceUrl + "qubematics/device/updatenode/",
  getSensorsByStatus: baseServiceUrl + "qubematics/device/getsensorsbystatus/",
  getNodeByStatus: baseServiceUrl + "qubematics/device/getnodesbystatus/",
  getGatewayByStatus: baseServiceUrl + "qubematics/device/gatewaybystatus/",
  assignedGatewayUrl:
    baseServiceUrl + "qubematics/device/createassignedgateway/",
  getAllAssignedInfo:
    baseServiceUrl + "qubematics/device/getallassignedgateway/",
  //getAllNodesByBranchUrl :'http://34.93.22.112:8002/api/qubematics/gateway/getallnodes/customer/branch/',
  getAllNodesByBranchUrl:
    baseServiceUrl + "qubematics/device/gatewaydetails/segment/",
  getSensorsByNodeUidUrl:
    baseServiceUrl + "qubematics/device/getsensor/nodeuid/",
  summaryViewUrl: baseServiceUrl + "qubematics/device/allnodescount/",

  getAllVendorUrl: baseServiceUrl + "qubematics/vendor/getall/?format=json",
  postVendorUrl: baseServiceUrl + "qubematics/vendor/create/?format=json",
  vendorUpdateUrl: baseServiceUrl + "qubematics/vendor/update/",
  getAvendorUrl: baseServiceUrl + "qubematics/vendor/getavendor/",
  getVendorNameIdUrl:
    baseServiceUrl + "qubematics/vendor/vendornameid/?format=json",
  createVendorManage: baseServiceUrl + "qubematics/vendor/vendormanage/",
  assignMentHistory: baseServiceUrl + "qubematics/vendor/gethistory/",
  customerManageUrl: baseServiceUrl + "qubematics/vendor/customerassign/",
  //graphUrl : "http://127.22.112:8086/query?db=sensor&q=select*from",
  dataGraphUrl:
    "http://3.7.89.92:8086/query?db=sensorReading&q=select * from DeviceSensorReading where sensor_type='\"",
  nodeDataUrl: "http://3.7.89.92:8086/query?db=sensorReading&q=",
  getNotification: baseServiceUrl + "qubematics/gateway/notifications/",
  getNotificationDetails:
    baseServiceUrl + "qubematics/device/getalldetails/node/",
  getAllNodesByCustomerId: baseServiceUrl + "qubematics/device/nodes/customer/",
  //login url
  postLoginUrl: baseServiceUrl + "qubematics/user/authuser/",

  customerdeviceAssignUrl: baseServiceUrl + "qubematics/device/deviceassign/",
  //get all gateway,node,sensor
  //GetAllGateWayNodeSensonUrl:"http://34.93.22.112:8002/api/qubematics/gateway/getallgateway/customerid/",
  GetAllGateWayNodeSensonUrl:
    baseServiceUrl + "qubematics/device/gatewaydetails/segment/customer/",
  //qm domian sensor type
  //getSensorTypeUrl : baseServiceUrl + "qubematics/qmdomain/get/sensor",
  //getIndustryTypeUrl : baseServiceUrl + 'qubematics/qmdomain/get/industry',
  getSensorThresholdUrl:
    baseServiceUrl + "qubematics/device/getsensorthresold/",
  getData: baseServiceUrl + "qubematics/device/getsensordata/",
  getMapData: baseServiceUrl + "qubematics/device/nodewithsensordata/",
  getHistoryData: baseServiceUrl + "qubematics/device/nodenotification/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
