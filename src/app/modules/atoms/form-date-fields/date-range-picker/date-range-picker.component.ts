import {
  Component,
  ElementRef,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import flatpickr, * as flatpickrImport from 'flatpickr';
import { emptyFunction } from '../../form-fields/forms-util';
import { FLATPICKR_DEFAULT_OPTIONS } from '../form-date-input/form-date-input.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  AbsolutePickerValue,
  DateRangePickerPreset,
  isAbsolute,
  isRelative,
  PickerMode,
  PickerValue,
  RelativePickerValue
} from './date-range-picker.model';

const flatpickrFunc = flatpickrImport as any as Function; // workaround for rollup and tests


const overridableOptions: flatpickr.Options.Options = {
  time_24hr: true,
};

const enforcedOptions: flatpickr.Options.Options = {
  inline: true,
  mode: 'single'
};

@Component({
  selector: 'rb-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateRangePickerComponent), multi: true}],
})
export class DateRangePickerComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() name;

  @Input() readonly;

  @Input() allowRelative = false;
  @Input() presets: DateRangePickerPreset[] = [];

  @Input() startLabel: string | TemplateRef<any> = 'Start';
  @Input() endLabel: string | TemplateRef<any> = 'End';
  @Input() absoluteLabel: string | TemplateRef<any> = 'Absolute';
  @Input() relativeLabel: string | TemplateRef<any> = 'Relative';
  @Input() presetsLabel: string | TemplateRef<any> = 'Presets';

  tab = 'absolute';

  mode: PickerMode = 'absolute';

  private pickerStart: flatpickr.Instance;
  private pickerEnd: flatpickr.Instance;

  /**
   * Options for Flatpickr
   * @see https://flatpickr.js.org/options/
   */
  @Input() options: flatpickr.Options.Options = {};

  private onChange = emptyFunction;
  private onTouched = emptyFunction;

  private absoluteValue: AbsolutePickerValue = null;

  private initialTabChange = true;

  relativeValue: RelativePickerValue = null;

  private lastModified = null;

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef,
              @Optional() @Inject(FLATPICKR_DEFAULT_OPTIONS) private defaultOptions: any) {
  }

  ngOnInit(): void {
    if (this.defaultOptions) {
      this.options = {
        ...overridableOptions,
        ...this.defaultOptions,
        ...this.options,
        ...enforcedOptions
      };
    } else {
      this.options = {
        ...overridableOptions,
        ...this.options,
        ...enforcedOptions
      };
    }
  }

  ngOnDestroy(): void {
    if (this.pickerStart) {
      this.pickerStart.destroy();
    }
    if (this.pickerEnd) {
      this.pickerEnd.destroy();
    }
  }

  @ViewChild('startDate', {static: false}) set initStartDateElement(el) {
    if (!el || el.nativeElement._flatpickr) {
      return;
    }
    const startOptions = {
      ...this.options,
      onValueUpdate: (selectedDates: Date[]) => {
        const start = toISOString(selectedDates[0]);
        this.pickerEnd.set('minDate', selectedDates[0]);
        const end = toISOString(this.pickerEnd.selectedDates[0]);
        this.updateAbsoluteValueFromPicker([start, end]);
      }
    };
    this.pickerStart = flatpickrFunc(el.nativeElement, startOptions) as flatpickr.Instance;
  }

  @ViewChild('endDate', {static: false}) set initEndDateElement(el) {
    if (!el || el.nativeElement._flatpickr) {
      return;
    }
    const endOptions = {
      ...this.options,
      onValueUpdate: (selectedDates: Date[]) => {
        const start = toISOString(this.pickerStart.selectedDates[0]);
        const end = toISOString(selectedDates[0]);
        this.updateAbsoluteValueFromPicker([start, end]);
      }
    };
    this.pickerEnd = flatpickrFunc(el.nativeElement, endOptions) as flatpickr.Instance;
    this.updatePicker();
  }

  tabChanged(tabId: string) {
    if (this.initialTabChange || this.tab === tabId) {
      this.initialTabChange = false;
      return;
    }
    this.tab = tabId;
    if (tabId === 'absolute') {
      this.mode = 'absolute';
      this.notifyChange(this.absoluteValue);
    }
    if (tabId === 'relative') {
      this.mode = 'relative';
      this.notifyChange(this.relativeValue);
    }
    if (tabId === 'preset') {

    }
  }

  updateAbsoluteValueFromPicker(value: AbsolutePickerValue) {
    if (this.tab !== 'absolute'
      || this.absoluteValue && this.absoluteValue[0] === value[0] && this.absoluteValue[1] === value[1]) {
      return;
    }
    this.absoluteValue = value;
    this.relativeValue = this.getRelativeFromAbsolute(value);
    this.notifyChange(value);
  }

  updateRelativeValue(value, index) {
    if (index === 0) {
      this.relativeValue = [value, this.relativeValue[1]];
    }
    if (index === 1) {
      this.relativeValue = [this.relativeValue[0], value];
    }

    this.absoluteValue = getAbsoluteFromRelative(this.relativeValue);
    this.updatePicker();
    this.notifyChange(this.relativeValue);
  }

  notifyChange(value) {
    if (value === this.lastModified || isEqual(value, this.lastModified)) {
      return;
    }
    this.lastModified = value;
    this.onChange(value);
  }

  writeValue(value: PickerValue): void {
    if (this.allowRelative && isRelative(value)) {
      this.mode = 'relative';
      this.tab = 'relative';
      this.relativeValue = value as RelativePickerValue;
      this.absoluteValue = getAbsoluteFromRelative(this.relativeValue);
      if (this.findPreset(this.relativeValue)) {
        this.tab = 'preset';
      }

    } else if (isAbsolute(value)) {
      this.mode = 'absolute';
      this.tab = 'absolute';
      this.relativeValue = this.getRelativeFromAbsolute(value as AbsolutePickerValue);
      this.absoluteValue = value as AbsolutePickerValue;
      if (this.findPreset(this.absoluteValue)) {
        this.tab = 'preset';
      }
    }
    this.lastModified = value;
    this.updatePicker();
  }

  private updatePicker() {
    const value = this.absoluteValue;
    if (!value) {
      return;
    }
    if (this.pickerStart && this.pickerStart.config) {
      this.pickerStart.setDate(value[0]);
    }
    if (this.pickerEnd && this.pickerEnd.config) {
      this.pickerEnd.setDate(value[1]);
      this.pickerEnd.set('minDate', value[0]);
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // this.renderer.setProperty(this.input.nativeElement, 'disabled', isDisabled);
  }

  findPreset(value: PickerValue): DateRangePickerPreset {
    if (!this.presets) {
      return null;
    }
    if (isAbsolute(value)) {
      return this.presets.filter(p => p.absoluteRange).find(p => isEqual(p.absoluteRange, value));
    } else if (isRelative(value)) {
      return this.presets.filter(p => p.relativeRange).find(p => isEqual(p.relativeRange, value));
    }

  }

  isPreset(p: DateRangePickerPreset) {
    return p.absoluteRange && this.absoluteValue && isEqual(this.absoluteValue, p.absoluteRange)
      || p.relativeRange && this.relativeValue && isEqual(this.relativeValue, p.relativeRange);
  }

  setPreset(preset: DateRangePickerPreset) {
    if (preset.relativeRange) {
      this.relativeValue = preset.relativeRange;
      this.absoluteValue = getAbsoluteFromRelative(this.relativeValue);
      // this.tab = 'relative';
      this.updatePicker();
      this.notifyChange(this.relativeValue);
    }
    if (preset.absoluteRange) {
      this.absoluteValue = preset.absoluteRange;
      this.relativeValue = this.getRelativeFromAbsolute(this.absoluteValue);
      // this.tab = 'absolute';
      this.updatePicker();
      this.notifyChange(this.absoluteValue);
    }
  }

  getRelativeFromAbsolute(value: AbsolutePickerValue, byDay = false): RelativePickerValue {
    const hf = this.options.enableTime && !byDay ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
    const now = Math.floor(new Date().getTime() / hf) * hf;
    const start = Math.floor(new Date(value[0]).getTime() / hf) * hf;
    const end = Math.floor(new Date(value[1]).getTime() / hf) * hf;
    if (!byDay && Math.abs((start - now) / hf) > 48) {
      return this.getRelativeFromAbsolute(value, true);
    }
    return [start - now, end - now];
  }

}

function toISOString(data: string | number | Date) {
  if (typeof data === 'string' || typeof data === 'number') {
    return new Date(data).toISOString();
  } else if (data instanceof Date) {
    return data.toISOString();
  }
  return '';
}

function getAbsoluteFromRelative(value: RelativePickerValue): AbsolutePickerValue {
  const now = new Date().getTime();
  const start = toISOString(now + (value[0] as number));
  const end = toISOString(now + (value[1] as number));
  return [start, end];
}


function isEqual(value1: PickerValue, value2: PickerValue) {
  return value1 === value2 || value1[0] === value2[0] && value1[1] === value2[1];
}
