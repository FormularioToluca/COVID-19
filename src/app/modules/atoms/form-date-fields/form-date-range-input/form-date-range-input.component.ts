import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import flatpickr, * as flatpickrImport from 'flatpickr';
import { FormValidationMessageDirective } from '../../form-fields/form-validation-message.directive';
import { emptyFunction } from '../../form-fields/forms-util';
import { FLATPICKR_DEFAULT_OPTIONS } from '../form-date-input/form-date-input.component';
import {
  DateRangePickerPreset,
  defaultTimeInputOptions, getRelativeInfo,
  isAbsolute,
  isRelative,
  PickerValue,
  TimeInputOptions
} from '../date-range-picker/date-range-picker.model';
import { TIME_INPUT_OPTIONS } from '../form-relative-time-input/relative-time-input.component';

const flatpickrFunc = flatpickrImport as any as Function; // workaround for rollup and tests


const overridableOptions = {
  time_24hr: true
};

@Component({
  selector: 'rb-form-date-range-input',
  templateUrl: './form-date-range-input.component.html',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FormDateRangeInputComponent), multi: true}],
})
export class FormDateRangeInputComponent implements ControlValueAccessor, AfterViewInit, OnDestroy, OnChanges {

  @Input() label: string | TemplateRef<any> = null;
  @Input() name: string;
  id = 'input.' + Math.random();
  @Input() readonly;

  @Input() allowRelative = false;
  @Input() presets: DateRangePickerPreset[] = [];

  @Input() startLabel: string | TemplateRef<any> = 'Start';
  @Input() endLabel: string | TemplateRef<any> = 'End';
  @Input() absoluteLabel: string | TemplateRef<any> = 'Absolute';
  @Input() relativeLabel: string | TemplateRef<any> = 'Relative';
  @Input() presetsLabel: string | TemplateRef<any> = 'Presets';

  @ContentChildren(FormValidationMessageDirective) messages: QueryList<FormValidationMessageDirective>;
  @ViewChild('input', {static: true}) input: ElementRef;

  private picker: flatpickr.Instance;

  value: PickerValue;

  displayValue = '';

  /**
   * Options for Flatpickr
   * @see https://flatpickr.js.org/options/
   */
  @Input() options: any = {};

  onChange = emptyFunction;
  onTouched = emptyFunction;

  private viewInit = false;

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef,
              @Optional() @Inject(FLATPICKR_DEFAULT_OPTIONS) private defaultOptions: any,
              @Optional() @Inject(TIME_INPUT_OPTIONS) private timeInputOptions: TimeInputOptions) {
    if (!timeInputOptions) {
      this.timeInputOptions = defaultTimeInputOptions;
    }
  }

  ngAfterViewInit(): void {
    this.viewInit = true;
    if (isAbsolute(this.value)) {
      this.initPicker();
    }

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

  initPicker() {
    if (this.defaultOptions) {
      this.options = {
        ...overridableOptions,
        ...this.defaultOptions,
        ...this.options,
        mode: 'range',
        clickOpens: false
      };
    } else {
      this.options = {
        ...overridableOptions,
        ...this.options,
        mode: 'range',
        clickOpens: false
      };
    }

    this.picker = flatpickrFunc(this.input.nativeElement, this.options) as flatpickr.Instance;
    if (this.value) {
      this.picker.setDate(this.value);
    }
  }

  isReadonly() {
    return this.readonly !== undefined;
  }

  updateValue(value) {
    this.value = value;
    this.updateTimeDisplay(value);

    this.checkValue(value);
    this.onChange(value);
  }

  checkValue(value) {
    if (value && value.length) {
      this.renderer.addClass(this.elementRef.nativeElement, 'not-empty');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'not-empty');
    }
  }

  isLabelTemplate() {
    return this.label instanceof TemplateRef;
  }


  writeValue(value: any): void {
    this.value = value;
    this.updateTimeDisplay(value);
  }

  updateTimeDisplay(value: any) {
    if (isAbsolute(value)) {
      this.renderer.setProperty(this.input.nativeElement, 'value', '');
      if (this.viewInit && !this.picker) {
        this.initPicker();
      } else if (this.picker) {
        this.picker.setDate(value);
      }
    }
    if (isRelative(value)) {
      const info1 = getRelativeInfo(value[0], this.timeInputOptions.units);
      const info2 = getRelativeInfo(value[1], this.timeInputOptions.units);
      this.displayValue = info1.displayText + (info2.count ? ' - ' + info2.displayText : '');
      this.renderer.setProperty(this.input.nativeElement, 'value', this.displayValue);
    }
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

}
