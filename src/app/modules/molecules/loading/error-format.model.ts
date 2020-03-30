import { InjectionToken, PipeTransform } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

export const ERROR_FORMATTER = new InjectionToken<ErrorFormatter>('rbErrorFormatter');

export class DetailedError implements Error {
  name = 'DetailedError';

  constructor(public message, public details?) {
  }

  public toString(): string {
    return this.message;
  }
}

export interface ErrorFormatter extends PipeTransform {
  /**
   * Check if the error can be handled.
   * If null is returned, the next Formatter will be tried.
   */
  transform(error: any): string | null;

  /**
   * Gets details of an error
   */
  getDetails?(error: any): string;
}

export class DefaultErrorFormatter implements ErrorFormatter {
  getDetails(error: any): string {
    if (error instanceof DetailedError) {
      if (typeof(error.details) === 'object') {
        return JSON.stringify(error.details, null, 2);
      }
      return error.details;
    }
    if (error instanceof HttpErrorResponse) {
      if (error.error) {
        if (typeof(error.error) === 'object') {
          return JSON.stringify(error.error, null, 2);
        }
        return String(error.error);
      }
    }
    return null;
  }

  transform(error: any): string | null {
    if (error instanceof HttpErrorResponse) {
      let text = 'Error: ';
      if (error.message) {
        text += error.message;
      }
      return text;
    }
    if (error instanceof Error || error instanceof DetailedError) {
      return String(error);
    }
    return null;
  }

}

export const DEFAULT_ERROR_FORMATTER = new DefaultErrorFormatter();
