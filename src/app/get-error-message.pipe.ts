import { HttpErrorResponse } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getErrorMessage'
})
export class GetErrorMessagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) {
      return;
    }

    const error = value as HttpErrorResponse;
    return error.message;
  }

}
