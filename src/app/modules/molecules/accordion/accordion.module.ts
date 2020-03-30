import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { AccordionTitleComponent } from './accordion-title/accordion-title.component';
import { AccordionBodyComponent } from './accordion-body/accordion-body.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AccordionComponent, AccordionTitleComponent, AccordionBodyComponent],
  exports: [AccordionComponent, AccordionTitleComponent, AccordionBodyComponent]
})
export class AccordionModule { }
