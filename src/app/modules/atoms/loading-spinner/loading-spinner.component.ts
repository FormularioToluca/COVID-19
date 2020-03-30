import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rb-loading-spinner',
  templateUrl: './loading-spinner.component.html'
})
export class LoadingSpinnerComponent implements OnInit {

  @Input() size = 1;

  constructor() { }

  ngOnInit() {
  }

  getHeight(): string {
    return this.calculate(60);
  }

  getWidth(): string {
    return this.calculate(60);
  }

  calculate(defaultVal: number): string {
    if (this.size > 0 && this.size < 3) {
      return (defaultVal * this.size) + 'px';
    } else {
      return defaultVal + 'px';
    }
  }
}
