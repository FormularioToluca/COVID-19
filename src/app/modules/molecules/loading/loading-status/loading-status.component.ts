import { Component, Input } from '@angular/core';
import { LoadingEntity } from '../loading-utils';

@Component({
  selector: 'rb-loading-status',
  templateUrl: './loading-status.component.html'
})
export class LoadingStatusComponent {

  @Input() size = 1;

  @Input() loadingEntity: LoadingEntity<any>;

  constructor() {
  }

}
