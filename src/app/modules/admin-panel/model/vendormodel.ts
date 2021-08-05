export interface AdditionalAttributes {
    addinfo_id? : number;
    vendor_id? : number;
    addinfo_attr? : string;
    addinfo_value? : string;
    addinfo_updated_on? : Date;
    addinfo_updated_by? : string;
    addinfo_effective_from? : Date;
    addinfo_effective_to? : Date;
}

export interface LegalInfo {
    legalinfo_id? : number;
    vendor_id? : number;
    legalinfo_type? : string;
    legalinfo_value? : string;
    legalinfo_updated_on? : Date;
    legalinfo_updated_by? : string;
    legalinfo_effective_from? : Date;
    legalinfo_effective_to? : Date;
}

export interface Phone {
    ph_id? : number;
    vendor_id? : number;
    ph_isd_code? : string;
    ph_no? : string;
    ph_updated_on? : Date;
    ph_updated_by? : string;
    ph_effective_from? : Date;
    ph_effective_to? : Date;
}

export interface Email {
    eml_id? : number;
    vendor_id? : number;
    eml_address? : string;
    eml_updated_on?:Date;
    eml_updated_by?:string;
    eml_effective_from? : Date;
    eml_effective_to? : Date;
}

export interface Address {
    add_id? : number;
    vendor_id? : number;
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

export interface Vendor {
    vendor_id? : number;
    vendor_name? : string;
    vendor_code? : string;
    vendor_type? : string;
    vendor_tag? : string;
    vendor_updated_on? : Date;
    vendor_updated_by? : string;
    vendor_effective_from? : Date;
    vendor_effective_to? : Date;
    additional_attributes?: AdditionalAttributes[];
    legal_infos?: LegalInfo[];
    phones?: Phone[];
    emails?: Email[];
    addresses?: Address[];
}

export interface Domaindata {
    domain_id?: number;
    domain_type?:string;
    domain_code?:string;
    domain_value?:string;
    domain_data_type?: string;
}

export interface ICustomerAssignmenrInfo{
    customer_name ?: string;
    customer_type ?: string;
    customer_code ?: string;
    customer_id ?: number;
}