import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {
  transform(items: any[], fieldName: string, filterValue: any): any[] {
    if (!items || !fieldName || filterValue === '') {
      return items;
    }
    return items.filter(item => item[fieldName] === filterValue);
  }
}