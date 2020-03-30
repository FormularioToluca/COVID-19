import { Component, ContentChildren, Input, OnDestroy, OnInit, QueryList } from '@angular/core';
import { AccordionTitleComponent } from './accordion-title/accordion-title.component';
import { AccordionBodyComponent } from './accordion-body/accordion-body.component';
import { AccordionService } from './accordion.service';

/**
 * <rb-accordion> is the container for
 * <rb-accordion-title> and <rb-accordion-body>
 */
@Component({
  selector: 'rb-accordion',
  templateUrl: './accordion.component.html',
  providers: [AccordionService]
})
export class AccordionComponent implements OnInit, OnDestroy {

  /**
   * Whether only one can be opened.
   */
  @Input() openSingle = false;


  @ContentChildren(AccordionTitleComponent) titles: QueryList<AccordionTitleComponent>;
  @ContentChildren(AccordionBodyComponent) bodies: QueryList<AccordionBodyComponent>;

  private updateSub = null;

  constructor(private accordion: AccordionService) {
  }

  ngOnInit() {
    this.updateSub = this.accordion.updateState.subscribe(t => this.updateState(t));
  }

  ngOnDestroy(): void {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }

  updateState(title: AccordionTitleComponent) {
    const titles = this.titles.toArray();
    const bodies = this.bodies.toArray();
    const index = titles.indexOf(title);
    if (index !== -1) {
      const component = bodies[index];
      if (title.open) {
        component.open();
      } else {
        component.close();
      }
      if (this.openSingle) {
        for (let i = 0; i < titles.length; i++) {
          const title2 = titles[i];
          const body = bodies[i];
          if (i !== index && title2.open) {
            title2.open = false;
            body.close();
          }
        }
      }
    }
  }

}
