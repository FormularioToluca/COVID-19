import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[rbSubBrandHeader]'
})
export class SubBrandHeaderDirective {

  constructor(public templateRef: TemplateRef<any>) { }

}

@Directive({
  selector: '[rbLogoHeader]'
})
export class LogoHeaderDirective {

  constructor(public templateRef: TemplateRef<any>) { }

}
