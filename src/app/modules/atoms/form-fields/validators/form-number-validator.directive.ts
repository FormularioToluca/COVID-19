import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[rbMin],[rbMax]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => FormNumberValidatorDirective),
    multi: true
  }]
})
export class FormNumberValidatorDirective implements Validator {

  @Input() rbMin: number;
  @Input() rbMax: number;

  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value === '') {
      return null;
    }
    const value = typeof (control.value) === 'number' ? control.value : parseFloat(control.value);
    const errors: ValidationErrors = {};
    if (this.rbMin !== undefined && value < this.rbMin) {
      errors.rbMin = this.rbMin;
    }
    if (this.rbMax !== undefined && value > this.rbMax) {
      errors.rbMax = this.rbMax;
    }

    return Object.keys(errors).length ? errors : null;
  }


}
