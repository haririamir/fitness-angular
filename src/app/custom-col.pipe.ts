import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCol',
})
export class CustomColPipe implements PipeTransform {
  transform(value: { name: any }): unknown {
    return value?.name || value;
  }
}
