import { Inject, Optional, Pipe, PipeTransform } from '@angular/core';
import { DEFAULT_ERROR_FORMATTER, ERROR_FORMATTER, ErrorFormatter } from './error-format.model';

/**
 * Formats an error to a string
 */
@Pipe({
  name: 'errorFormat',
  pure: true
})
export class ErrorFormatPipe implements PipeTransform {
  formatters: ErrorFormatter[];

  constructor(@Optional() @Inject(ERROR_FORMATTER) formatters: ErrorFormatter[]) {
    if (!formatters) {
      this.formatters = [DEFAULT_ERROR_FORMATTER];
    } else {
      this.formatters = formatters.slice();
      this.formatters.push(DEFAULT_ERROR_FORMATTER);
    }
  }

  transform(error: any, args?: any): string {
    if (this.formatters && this.formatters.length) {
      for (let i = 0; i < this.formatters.length; i++) {
        const formatter = this.formatters[i];
        const result = formatter.transform(error);
        if (result !== null) {
          return result;
        }
      }
    }
    return String(error);
  }

}
