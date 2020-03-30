import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef, Inject, InjectionToken,
  Input, OnChanges,
  OnDestroy, Optional,
  QueryList,
  Renderer2, SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValidationMessageDirective } from '../../form-fields/form-validation-message.directive';
import { emptyFunction } from '../../form-fields/forms-util';
import flatpickr from 'flatpickr';
import * as flatpickrImport from 'flatpickr';

const flatpickrFunc = flatpickrImport as any as Function; // workaround for rollup and tests


export const FLATPICKR_DEFAULT_OPTIONS = new InjectionToken<any>('flatpickrDefaultOptions');

const overridableOptions = {
  time_24hr: true
};

/**
 * Displays a input for flatpickr
 * The value, is a ISO Date String or an array of ISO Date Strings.
 */
@Component({
  selector: 'rb-form-date-input',
  templateUrl: './form-date-input.component.html',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FormDateInputComponent), multi: true}],
  exportAs: 'dateInput'
})
export class FormDateInputComponent implements ControlValueAccessor, AfterViewInit, OnDestroy, OnChanges {

  @Input() label: string | TemplateRef<any> = null;
  @Input() name: string;
  @Input() type = 'text';
  id = 'input.' + Math.random();
  @Input() readonly;

  @ContentChildren(FormValidationMessageDirective) messages: QueryList<FormValidationMessageDirective>;
  @ViewChild('input', { static: true }) input: ElementRef;

  private picker: flatpickr.Instance;

  /**
   * Options for Flatpickr
   * @see https://flatpickr.js.org/options/
   */
  @Input() options: any = {};

  /**
   * Given, when this is the start date.
   * Start input is responsible for options
   */
  @Input() rangeEnd: FormDateInputComponent = null;

  onChange = emptyFunction;
  onTouched = emptyFunction;

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef,
              @Optional() @Inject(FLATPICKR_DEFAULT_OPTIONS) private defaultOptions: any) {
  }

  ngAfterViewInit(): void {
    if (this.defaultOptions) {
      this.options = {
        ...overridableOptions,
        ...this.defaultOptions,
        ...this.options
      };
    } else {
      this.options = {
        ...overridableOptions,
        ...this.options
      };
    }

    this.options.onValueUpdate = (selectedDates: Date[], dateString: string) => {
      this.updateValue(selectedDates);
    };

    if (this.rangeEnd) {
      this.rangeEnd.options = {...this.options};
    }

    this.picker = flatpickrFunc(this.input.nativeElement, this.options) as flatpickr.Instance;

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options && this.picker && changes.options.currentValue) {
      Object.keys(changes.options.currentValue).forEach(opt => {
        this.picker.set(opt as any, changes.options.currentValue[opt]);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.picker) {
      this.picker.destroy();
    }
  }

  isReadonly() {
    return this.readonly !== undefined;
  }

  updateValue(value) {
    if (this.picker.config.mode === 'single' && value && value.length) {
      value = value[0].toISOString();
    }
    if (['range', 'multiple'].indexOf(this.picker.config.mode) !== -1 && value && value.length) {
      value = value.map(v => v.toISOString());
    }

    this.checkValue(value);
    this.onChange(value);
    this.updateEndRange();
  }

  updateEndRange() {
    if (this.rangeEnd && this.picker.selectedDates[0]) {
      const start = this.picker.selectedDates[0];
      const end = this.rangeEnd.picker.selectedDates[0];
      this.rangeEnd.picker.set('minDate', this.picker.selectedDates[0]);
      if (start && end && end.getTime() < start.getTime()) {
        this.rangeEnd.writeValue(start.toISOString());
      }
    }
  }

  checkValue(value) {
    if (typeof(value) === 'string' && value.length > 0 || value && value.length) {
      this.renderer.addClass(this.elementRef.nativeElement, 'not-empty');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'not-empty');
    }
  }

  isLabelTemplate() {
    return this.label instanceof TemplateRef;
  }


  writeValue(value: any): void {
    if (value === null || value === undefined) {
      value = '';
    }
    this.checkValue(value);
    if (this.picker && this.picker.config) {
      this.picker.setDate(value);
    }
    this.updateEndRange();
    // this.renderer.setProperty(this.input.nativeElement, 'value', value);
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

  toggle(): void {
    this.picker.toggle();
  }

  close(): void {
    this.picker.close();
  }

}
