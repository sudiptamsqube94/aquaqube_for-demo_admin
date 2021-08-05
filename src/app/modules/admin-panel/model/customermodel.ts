export interface AdditionalAttributes {
    addinfo_id? : number;
    customer_id? : number;
    addinfo_attr? : string;
    addinfo_value? : string;
    addinfo_updated_on? : Date;
    addinfo_updated_by? : string;
    addinfo_effective_from? : Date;
    addinfo_effective_to? : Date;
}

export interface LegalInfo {
    legalinfo_id? : number;
    customer_id? : number;
    legalinfo_type? : string;
    legalinfo_value? : string;
    legalinfo_updated_on? : Date;
    legalinfo_updated_by? : string;
    legalinfo_effective_from? : Date;
    legalinfo_effective_to? : Date;
}

export interface Phone {
    ph_id? : number;
    customer_id? : number;
    ph_isd_code? : string;
    ph_no? : string;
    ph_updated_on? : Date;
    ph_updated_by? : string;
    ph_effective_from? : Date;
    ph_effective_to? : Date;
}

export interface Email {
    eml_id? : number;
    customer_id? : number;
    eml_address? : string;
    eml_updated_on?:Date;
    eml_updated_by?:string;
    eml_effective_from? : Date;
    eml_effective_to? : Date;
}

export interface Address {
    add_id? : number;
    customer_id? : number;
    add_type? : string;
    add_address_line1? : string;
    add_address_line2? : string;
    add_city? : string;
    add_state? : string;
    add_country? : string;
    add_pin? : string;
    add_updated_on? : Date;
    add_updated_by? : string;
    add_effective_from? : Date;
    add_effective_to? : Date;
}

export interface Branch {
    branch_id? : number;
    customer_id? : number;
    branch_name? : string;
    branch_add_line1? : string;
    branch_add_line2? : string;
    branch_add_city? : string;
    branch_add_state? : string;
    branch_add_pin? : string;
    branch_add_country? : string;
    branch_updated_on? : Date;
    branch_updated_by? : string;
    branch_effective_from? : Date;
    branch_effective_to? : Date;
    longitude ?: string;
    latitude ?: string;
}

export interface Customer {
    customer_id? : number;
    customer_name? : string;
    customer_code? : string;
    customer_type? : string;
    customer_tag? : string;
    customer_updated_on? : Date;
    customer_updated_by? : string;
    customer_effective_from? : Date;
    customer_effective_to? : Date;
    attributes? : AdditionalAttributes[];
    infos? : LegalInfo[];
    phones? : Phone[];
    emails? : Email[];
    addresses? : Address[];
    branches? : Branch[];
}

export interface Device{
    device_id ?: number;
    device_name ?: string;
    device_mac ?:string;
    device_updated_by ?: string;
    device_updated_on ?: Date;
    device_effective_from ?: Date;
    device_effective_to ?: Date;
    sensors ?:Sensor[];
}

export interface DeviceMonitor{
    device_name ?: string;
    device_monitor_id ?:number;
    device_id ?: number;                         
    device_mac ?: string;
    data_collection_frequency ?: number;  
    data_sending_frequency ?: number;
    device_health ?: string;
    device_frequency_updated_on ?:Date;
    device_frequency_updated_by ?:string;
    device_last_heartbeat ?: Date; 
    device_activated ?: boolean;
}
export interface Sensor {
    sensor_id ?:number;
    sensor_name ?: string;
    sensor_type ?: number;
    sensor_threshold_max ?:number
    sensor_threshold_min ?:number
    sensor_updated_on ?: Date;
    sensor_updated_by ?: string;
    sensor_effective_from ?: Date;
    sensor_effective_to ?: Date;
}

export interface Domaindata {
    domain_id?: number;
    domain_type?:string;
    domain_code?:string;
    domain_value?:string;
    domain_data_type?: string;
}

export interface DeviceAssignment{
    device_assign_id ?: number;
    device_id ?: number;
    device_name ?: string;
    customer_id ?: number;
    customer_name ?: string;
    branch_unit?: string;
    customer_branch_id ?: number;
    customer_branch_name ?: string;
    device_assign_effective_from ?: Date;
    device_assign_effective_to ?: Date;
}

export interface CustomerAssignment{
    customer_manage_id ?: number;
    customer_id ?: number;
    vendor_id ?: number;
    vendor_name ?: string;
    assign_effective_from ?: Date;
    assign_effective_to ?: Date;
}

export interface Devices{
    uid ?: number;
    node_effective_from ?: Date;
    list_of_node ?: number;
    sensor ?: any;
}