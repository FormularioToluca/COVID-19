import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[rbTabPanelTitle]'
})
export class TabPanelTitleDirective {

  constructor(public templateRef: TemplateRef<any>) { }

}
