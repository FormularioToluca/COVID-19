import {
  Component,
  ContentChildren,
  ElementRef, forwardRef,
  Input,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { FormValidationMessageDirective } from '../form-validation-message.directive';
import { emptyFunction } from '../forms-util';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rb-form-radio',
  templateUrl: './form-radio.component.html',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FormRadioComponent), multi: true}]
})
export class FormRadioComponent implements ControlValueAccessor {

  id = 'radio.' + Math.random();
  @Input() required: boolean;
  @Input() noValidation: boolean;
  @Input() name: string;

  @Input() label: string | TemplateRef<any> = null;


  @ViewChild('input', {static: true}) input: ElementRef;

  @ContentChildren(FormValidationMessageDirective) messages: QueryList<FormValidationMessageDirective>;

  @Input() value: any;

  @Input() readonly;

  onChange = emptyFunction;
  onTouched = emptyFunction;

  constructor(private renderer: Renderer2) {
  }

  updateValue(isChecked: boolean) {
    if (isChecked) {
      this.onChange(this.value);
    }

  }

  isLabelTemplate() {
    return this.label instanceof TemplateRef;
  }

  writeValue(value: any): void {
    if (value === this.value) {
      this.renderer.setProperty(this.input.nativeElement, 'checked', true);
    }
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

  isReadonly(): boolean {
    return !!(this.readonly === '' || this.readonly);
  }

}
