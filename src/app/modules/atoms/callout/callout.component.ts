import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'rb-callout',
  templateUrl: './callout.component.html'
})
export class CalloutComponent implements OnChanges {

  @Input() type: 'error' | 'warning' | 'info' | 'success' = 'error';

  icon = ['rb-ic', 'rb-ic-alert-error-filled'];

  type2icon = {
    error: 'rb-ic-alert-error-filled',
    success: 'rb-ic-alert-success-filled',
    warning: 'rb-ic-alert-warning-filled',
    info: 'rb-ic-info',
  };

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type) {
      this.icon = ['rb-ic', this.type2icon[changes.type.currentValue]];
    }
  }


}
