import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './api/Task';

@Pipe({
  name: 'example'
})
export class ExamplePipe implements PipeTransform {

  transform(value: Task, ...args: unknown[]): string {
    return JSON.stringify(value, null, 2);
  }

}
