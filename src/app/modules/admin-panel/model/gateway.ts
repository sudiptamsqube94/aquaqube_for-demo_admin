export interface gateway{
    gateway_id ?: number,
    uid ?: string,
    status ?: boolean,
    isAlive ?: number,
    gateway_name ?: string
    nodes ?: node[]
}

export interface node{
    node_id ?: number,
    uid ?: string,
    status ?: number,
    node_updated_on ?: Date,
    node_updated_by ?: string,
    node_effective_from ?: Date,
    node_effective_to ?: Date,
    data_collection_frequency ?: number,
    data_sending_frequency ?: number
    sensors ?: sensor[],
    industry_type ?: number,
    latitude ?: number,
    longitude ?: number
}

export interface sensor {
    sensor_id ?: number;
    sensor_type ?: number;
    sensor_model ?: string;
    sensor_make ?: string;
    sensor_desc ?: string;
    sensor_threshold_max ?: number;
    sensor_threshold_min ?: number;
    sensor_updated_on ?: Date
    sensor_updated_by ?: string;
    sensor_effective_from ?: Date;
    sensor_effective_to ?: Date;
    sensor_status ?: number;
}

export interface assignmentinfo {
    gateway_id ?: number;
    customer_id ?: number;
    customer_branch_id ?: number;
    customer_branch_name ?: string;
    gateway_assign_effective_from ?: Date;
    gateway_assign_effective_to ?: Date;
    customer_name ?: string;
    gateway_name ?: string;
    branch_unit ?: string;
    gateway_assign_id ?: number;
}