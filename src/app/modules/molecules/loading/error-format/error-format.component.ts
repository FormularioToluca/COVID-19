import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { DEFAULT_ERROR_FORMATTER, ERROR_FORMATTER, ErrorFormatter } from '../error-format.model';

@Component({
  selector: 'rb-error-format',
  templateUrl: './error-format.component.html',
  styleUrls: ['./error-format.component.scss']
})
export class ErrorFormatComponent implements OnInit {

  private formatters: ErrorFormatter[];

  @Input() error: any;

  opened = false;

  message: string;

  details: string;

  constructor(@Optional() @Inject(ERROR_FORMATTER) formatters: ErrorFormatter[]) {
    if (!formatters) {
      this.formatters = [DEFAULT_ERROR_FORMATTER];
    } else {
      this.formatters = formatters.slice();
      this.formatters.push(DEFAULT_ERROR_FORMATTER);
    }
  }

  ngOnInit() {
    this.identifyErrorData(this.error);
  }

  identifyErrorData(error) {
    if (this.formatters && this.formatters.length) {
      for (let i = 0; i < this.formatters.length; i++) {
        const formatter = this.formatters[i];
        const result = formatter.transform(error);
        if (result !== null) {
          this.message = result;
          if (formatter.getDetails) {
            this.details = formatter.getDetails(error);
          }
          return result;
        }
      }
    }
    this.message = String(error);
  }


}
