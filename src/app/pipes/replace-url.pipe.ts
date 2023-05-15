import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceUrl',
})
export class ReplaceUrlPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace('https://www.superherodb.com', '/img');
  }
}
