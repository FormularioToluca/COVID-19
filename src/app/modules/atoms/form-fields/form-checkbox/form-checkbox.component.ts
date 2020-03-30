import { Component, ContentChildren, ElementRef, forwardRef, Input, QueryList, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValidationMessageDirective } from '../form-validation-message.directive';
import { emptyFunction } from '../forms-util';


@Component({
  selector: 'rb-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FormCheckboxComponent), multi: true}]
})
export class FormCheckboxComponent implements ControlValueAccessor {

  id = 'checkbox.' + Math.random();
  @Input() required: boolean;
  @Input() noValidation: boolean;
  @Input() name: string;

  @Input() label: string | TemplateRef<any> = null;


  @ViewChild('input', { static: true }) input: ElementRef;

  @ContentChildren(FormValidationMessageDirective) messages: QueryList<FormValidationMessageDirective>;

  onChange = emptyFunction;
  onTouched = emptyFunction;

  constructor(private renderer: Renderer2) {
  }

  updateValue(value) {
    this.onChange(value);
  }

  isLabelTemplate() {
    return this.label instanceof TemplateRef;
  }

  writeValue(value: any): void {
    this.renderer.setProperty(this.input.nativeElement, 'checked', value);
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.input.nativeElement, 'disabled', isDisabled);
  }
}
