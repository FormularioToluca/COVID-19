import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  Inject,
  InjectionToken,
  Input,
  Optional,
  QueryList,
  Renderer2,
  Self,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { FormValidationMessageDirective } from '../form-validation-message.directive';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { emptyFunction } from '../forms-util';

export interface CustomValueConverter {
  modelToValue(model: any): string;

  valueToModel(value: string): any;
}

export const CUSTOM_VALUE_CONVERTER = new InjectionToken<CustomValueConverter>('formInputCustomValueConverter');

@Component({
  selector: 'rb-form-input',
  templateUrl: './form-input.component.html',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FormInputComponent), multi: true}],
  exportAs: 'rbFormInput',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputComponent implements ControlValueAccessor, AfterViewInit {

  @Input() name: string;
  @Input() placeholder = '';
  @Input() label: string | TemplateRef<any> = null;
  @Input() type = 'text';
  id = 'input.' + Math.random();
  @Input() readonly;
  @Input() autocomplete: string;
  /**
   * CSS Classes for an icon
   */
  @Input() icon: string;

  @Input() autofocus: boolean;


  @ContentChildren(FormValidationMessageDirective) messages: QueryList<FormValidationMessageDirective>;
  @ViewChild('input', {static: true}) input: ElementRef;

  onChange = emptyFunction;
  onTouched = emptyFunction;

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef,
              @Optional() @Self() @Inject(CUSTOM_VALUE_CONVERTER) private valueConverter: CustomValueConverter,
              private cd: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    if (this.autofocus) {
      this.focus();
    }
    if (this.autocomplete !== undefined) {
      this.input.nativeElement.autocomplete = this.autocomplete;
    }
  }

  focus() {
    this.input.nativeElement.focus();
  }

  updateIcon(icon: string) {
    this.icon = icon;
    this.cd.detectChanges();
  }

  isReadonly(): boolean {
    return !!(this.readonly === '' || this.readonly);
  }

  updateValue(value) {
    this.checkValue(value);
    if (this.valueConverter) {
      this.onChange(this.valueConverter.valueToModel(value));
    } else {
      this.onChange(value);
    }
  }

  checkValue(value) {
    if (typeof (value) === 'string' && value.length > 0) {
      this.renderer.addClass(this.elementRef.nativeElement, 'not-empty');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'not-empty');
    }
  }

  isLabelTemplate() {
    return this.label instanceof TemplateRef;
  }


  writeValue(value: any): void {
    if (this.valueConverter) {
      value = this.valueConverter.modelToValue(value);
    }
    if (value === null || value === undefined) {
      value = '';
    } else {
      value = String(value);
    }
    this.checkValue(value);
    this.renderer.setProperty(this.input.nativeElement, 'value', value);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.input.nativeElement, 'disabled', isDisabled);
  }

  @Input()
  set maxlength(maxLength: string) {
    if (maxLength) {
      this.renderer.setAttribute(this.input.nativeElement, 'maxlength', maxLength);
    } else {
      this.renderer.removeAttribute(this.input.nativeElement, 'maxlength');
    }

  }

}
