import { Component, forwardRef, Inject, InjectionToken, Input, OnInit, Optional, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  defaultTimeInputOptions,
  getRelativeInfo,
  TimeInputOptions,
  TimeInputOptionsUnit
} from '../date-range-picker/date-range-picker.model';

export const TIME_INPUT_OPTIONS = new InjectionToken<TimeInputOptions>('formRelativeInputTimeOptions');

@Component({
  selector: 'rb-form-relative-time-input',
  templateUrl: './relative-time-input.component.html',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RelativeTimeInputComponent), multi: true}],
})
export class RelativeTimeInputComponent implements OnInit, ControlValueAccessor {

  @Input() label: string | TemplateRef<any>;

  id = 'input.' + Math.random();

  onChange = emptyFunction;
  onTouched = emptyFunction;

  disabled = false;

  operator = '-';

  count = '0';

  unit = 'ms';

  units: TimeInputOptionsUnit[];

  displayText = '';

  constructor(@Inject(TIME_INPUT_OPTIONS) @Optional() private options: TimeInputOptions) {
    if (!options) {
      this.options = defaultTimeInputOptions;
    }
  }

  ngOnInit() {
    this.units = defaultTimeInputOptions.units;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: number | string): void {
    const info = getRelativeInfo(obj, this.units);
    this.count = info.count.toString();
    this.operator = info.operator;
    this.unit = info.unit;
    this.displayText = info.displayText;
  }

  getValue() {
    const count = parseInt(this.count, 10) * this.getDivisor();
    if (isNaN(count)) {
      return 0;
    } else {
      return this.operator === '-' ? count * -1 : count;
    }
  }

  getDivisor() {
    return this.units.find(u => u.unit === this.unit).value;
  }

  notifyChange() {
    const value = this.getValue();
    this.onChange(value);
  }

  updateUnit(unit: string) {
    const oldDivisor = this.getDivisor();
    this.unit = unit;
    const newDivisor = this.getDivisor();
    if (newDivisor > oldDivisor) {
      const baseValue = parseInt(this.count, 10) * oldDivisor;
      this.count = Math.ceil(baseValue / newDivisor).toString();
    }

    this.notifyChange();
  }

  isLabelTemplate() {
    return this.label instanceof TemplateRef;
  }

}

export function emptyFunction(_?: any) {
}
