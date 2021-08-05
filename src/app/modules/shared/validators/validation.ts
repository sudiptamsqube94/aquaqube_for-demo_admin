import { AbstractControl } from '@angular/forms';
import { AdminPanelMainService } from '../../admin-panel/admin-panel-main.service';

export class Validation {

    constructor(private adminService : AdminPanelMainService) {

    }

    static email(c: AbstractControl) : {[key: string] : boolean} | null {
        var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        //var test = regexp.test(this.value);
        if(c.value != null && !(regexp.test(c.value))){
            return {'email': true};
        }
        return null;
    }

    static pincode(c: AbstractControl) : {[key: string] : boolean} | null {
        var regexp = new RegExp(/^[0-9]*$/);
        //var test = regexp.test(this.value);
        if(c.value != null && !(regexp.test(c.value))){
            return {'pincode': true};
        }
        return null;
    }

    static bankaccount(c: AbstractControl) : {[key: string] : boolean} | null {
        var regexp = new RegExp(/^[0-9]*$/);
        //var test = regexp.test(this.value);
        if(c.value != null && !(regexp.test(c.value))){
            return {'bankaccount': true};
        }
        return null;
    }

    static phonenumber(c: AbstractControl) : {[key: string] : boolean} | null {
        var regexp = new RegExp(/^[0-9]{10}$/);
        //var test = regexp.test(this.value);
        if(c.value != null && !(regexp.test(c.value))){
            return {'phonenumber': true};
        }
        return null;
    }

    static nonleadingspace(c: AbstractControl) : {[key: string] : boolean} | null {
        var regexp = new RegExp(/^[A-Za-z0-9].*$/);
        //var test = regexp.test(this.value);
        if(c.value != null && !(regexp.test(c.value))){
            return {'leadingspace': true};
        }
        return null;
    }
}
