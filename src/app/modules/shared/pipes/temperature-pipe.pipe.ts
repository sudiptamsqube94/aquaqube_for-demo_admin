import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'temperaturePipe'
})
export class TemperaturePipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let temp=args[0];
    if(temp=='C'){
      return value +"℃";
    }
    return value +"℉";
  }

}
