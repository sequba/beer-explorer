import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'default'
})
export class DefaultPipe implements PipeTransform {
  transform(value: string | number | null, defaultValue: string): string | number {
    return (value !== null && value !== undefined) ? value : defaultValue;
  }
}
