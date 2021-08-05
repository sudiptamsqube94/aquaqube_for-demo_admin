import { Directive, AfterViewInit, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { MatErrorComponent } from '../../components/mat-error/mat-error.component';
import { MatFormField } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable, fromEvent, merge } from 'rxjs';
import { shareReplay, debounceTime } from 'rxjs/operators';

@Directive({
  selector: 'mat-form-field:not([novalidate])'
})
export class ErrorDirective implements AfterViewInit {

  ref: ComponentRef<MatErrorComponent>;

  constructor( 
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private formField: MatFormField
  ) { }

  public ngAfterViewInit() {

    let controlBlurs: Observable<any> = fromEvent((this.formField._control as any)._elementRef.nativeElement, 'blur').pipe(shareReplay(1))

    merge(
      controlBlurs,
      this.formField._control.ngControl.control.statusChanges,
    )
    .pipe(
      untilDestroyed(this), debounceTime(250)
      ).subscribe(
        res=>this.onChange(res)
      )  
  }

  public onChange(res) {
    if (this.formField._control.ngControl.control.errors)
    {
      var errors = this.formField._control.ngControl.control.errors;
      if(errors.required){
        this.setError('This field is required');
      }
      else if(errors.email){
        this.setError('Invalid email format');
      }
      else if(errors.pincode){
        this.setError('Invalid pincode');
      }
      else if(errors.phonenumber){
        this.setError('Invalid phone number');
      }
      else if(errors.duplicateorgcode){
        this.setError('Duplicate Organization Code');
      }
      else if(errors.duplicatevendorcode){
        this.setError('Duplicate Vendor Code');
      }
      else if(errors.duplicateprojectcode){
        this.setError('Duplicate Project Code');
      }
      else if(errors.duplicatecustomercode){
        this.setError('Duplicate Customer Code');
      }
      else if(errors.bankaccount){
        this.setError('Invalid Bank Account Number');
      }
      else if(errors.leadingspace){
        this.setError('Invalid Data');
      }
      else if(errors.maxlength){
        this.setError('Maximum Length Limit :' + errors.maxlength.requiredLength + ", Provided :" + errors.maxlength.actualLength );
      }
    }
    else
    {
      this.setError('')
    }
  }

  setError(text: string) {
    if (!this.ref) {
     const factory = this.resolver.resolveComponentFactory(MatErrorComponent);
     this.formField._elementRef
     this.ref = this.vcr.createComponent(factory);
   }
   this.ref.instance.message=text;
  }

  ngOnDestroy(){

  }

}
