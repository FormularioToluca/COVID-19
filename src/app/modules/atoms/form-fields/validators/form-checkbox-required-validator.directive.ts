import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

/* tslint:disable:directive-selector */
@Directive({
  selector: 'rb-form-checkbox[required],rb-form-multi-select[required]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => FormCheckboxRequiredValidatorDirective),
    multi: true
  }]
})
export class FormCheckboxRequiredValidatorDirective implements Validator {
  private _required: boolean;
  private _onChange: () => void;

  @Input() statesMode: 'check' | 'optCheck' = 'check';

  constructor() {
  }

  @Input()
  get required(): boolean | string {
    return this._required;
  }

  set required(value: boolean | string) {
    this._required = value != null && value !== false && `${value}` !== 'false';
    if (this._onChange) {
      this._onChange();
    }
  }

  validate(c: AbstractControl): ValidationErrors | null {
    if (this.required) {
      return this.hasValue(c) ? null : {'required': true};
    }
    return null;
  }

  hasValue(c: AbstractControl): boolean {
    if (typeof(c.value) === 'boolean') {
      return c.value === true;
    }
    if (typeof(c.value) === 'object' && c.value) {
      const values = Object.keys(c.value).map(key => c.value[key]);
      if (this.statesMode === 'optCheck') {
        return values.some(v => v !== null);
      }
      if (this.statesMode === 'check') {
        return values.some(v => v !== false);
      }
    }
    return true;
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onChange = fn;
  }

}
