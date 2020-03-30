import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'rb-accordion-body',
  templateUrl: './accordion-body.component.html'
})
export class AccordionBodyComponent {

  isOpen = false;

  constructor() {
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

}
