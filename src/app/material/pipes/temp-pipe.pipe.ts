import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempPipe'
})
export class TempPipePipe implements PipeTransform {

  value: String;
  
  transform(value: any, ...args: any[]): any {
    this.value = value + "\xB0C";
    return this.value;
  }

}
