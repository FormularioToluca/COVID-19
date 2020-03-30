import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rb-progress-indicator',
  templateUrl: './progress-indicator.component.html'
})
export class ProgressIndicatorComponent implements OnInit {

  @Input() total = Infinity;
  @Input() current = Infinity;

  constructor() {
  }

  ngOnInit() {
  }

  get percent() {
    return this.total > 0 && this.total !== Infinity ? this.current / this.total * 100 : 100;
  }

  get isDeterminate(): boolean {
    return this.total !== Infinity;
  }

}
