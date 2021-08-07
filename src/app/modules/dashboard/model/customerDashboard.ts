import { gateway } from "../../admin-panel/model/gateway";

export interface CustomerDashBoard {
  device_id?: number;
  device_name?: string;
  customer_branch_name?: string;
  device_health?: string;
  device_last_heartbeat?: Date;
  device_mac?: string;
  no_device?: number;
}

export interface customerSupport {
  customer_id?: number;
  node_id?: number;
  details?: string;
  creation_date?: Date;
  status?: number;
  support_id?: number;
}

export interface payload {
  customer_id?: number;
  customer_branch_id?: number;
}

export interface sensorData {
  name: Date;
  value: number;
}

export interface segment {
  customer_branch_id?: number;
  segment_id?: number;
  segment_name?: string;
  gateway?: gateway[];
}
export interface Notifications {
  time?: Date;
  customer_id?: number;
  mac_address?: string;
  node_uid?: string;
  reading?: number;
  sensor?: string;
  sensor_type?: number;
  tmax?: number;
  tmin?: number;
}

export interface Sensor {
  sensor_id: number;
  sensor_type: number;
  sensor_model: string;
  sensor_make: string;
  sensor_desc: string;
  sensor_threshold_max: number;
  sensor_threshold_min: number;
  sensor_updated_on?: any;
  sensor_updated_by?: any;
  sensor_effective_from: Date;
  sensor_effective_to?: any;
  sensor_status: number;
  sensor_name: string;
  node: number;
  current_reading?: number;
  reading_time: Date;
  sensor_type_name?: string;
}

export interface Nodes {
  node_id: number;
  sensors: Sensor[];
  uid: string;
  status: number;
  node_updated_on?: any;
  node_updated_by?: any;
  node_effective_from: Date;
  node_effective_to?: any;
  data_collection_frequency: number;
  data_sending_frequency: number;
  industry_type: number;
  node_latitude: string;
  node_longitude: string;
  gps_datetime?: Date;
  gateway: number;
  notification_count: number;
}

export interface historyy {
  result: string;
  table: number;
  _start: Date;
  _stop: Date;
  _time: Date;
  _value: number;
  _field: string;
  _measurement: string;
  customer_id: string;
  latitude: string;
  longitude: string;
  mac_address: string;
  node_uid: string;
  sensor: string;
  sensor_type: string;
  sensor_type_name: string;
  max_value: string
  min_value: string
}
export interface Data1{
  node_uid?: string;
  sensor_type?: number;
}