import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AccordionService } from '../accordion.service';

@Component({
  selector: 'rb-accordion-title',
  templateUrl: './accordion-title.component.html'
})
export class AccordionTitleComponent implements OnChanges, AfterViewInit {

  @Input() open = false;

  private viewInit = false;

  constructor(private accordion: AccordionService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.open && this.viewInit) {
      this.accordion.updateState.next(this);
    }
  }

  ngAfterViewInit(): void {
    this.viewInit = true;
    if (this.open) {
      setTimeout(() => {
        this.accordion.updateState.next(this);
      });
    }
  }


  toggle() {
    this.open = !this.open;
    this.accordion.updateState.next(this);
  }

}
