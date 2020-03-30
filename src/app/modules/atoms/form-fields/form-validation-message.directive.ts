import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[rbFormValidationMessage]'
})
export class FormValidationMessageDirective {

  name: string;

  onTouched = false;

  constructor(public templateRef: TemplateRef<any>) {
  }

  @Input() set rbFormValidationMessage(name: string) {
    this.name = name;
  }

  @Input() set rbFormValidationMessageOnTouched(onTouched: boolean) {
    this.onTouched = onTouched;
  }

}
