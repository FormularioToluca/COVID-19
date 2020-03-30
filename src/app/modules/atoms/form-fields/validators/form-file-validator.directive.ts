import { Directive, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

/* tslint:disable:directive-selector */
@Directive({
  selector: 'rb-form-file[min],rb-form-file[max],rb-form-file[min],rb-form-file[maxSize]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => FormFileValidatorDirective),
    multi: true
  }]
})
export class FormFileValidatorDirective implements Validator, OnChanges {

  private onChange: () => void;

  @Input() min: string;
  @Input() max: string;
  @Input() maxSize: string;

  constructor() {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.onChange && (changes.min || changes.max || changes.maxSize)) {
      this.onChange();
    }
  }

  validate(c: AbstractControl): ValidationErrors | null {
    const errors: ValidationErrors = {};
    const minNumber = this.min ? parseInt(this.min, 10) : 0;
    const maxNumber = this.max ? parseInt(this.max, 10) : 0;
    const maxSize = this.maxSize ? parseInt(this.maxSize, 10) : 0;
    if (minNumber && (!c.value || Array.isArray(c.value) && c.value.length < minNumber)) {
      errors.min = true;
    }
    if (maxNumber && (!c.value || Array.isArray(c.value) && c.value.length > maxNumber)) {
      errors.max = true;
    }
    if (maxSize && Array.isArray(c.value)) {
      c.value.some((file: File) => {
        if (file.size > maxSize) {
          errors.maxSize = file.name;
          return true;
        }
        return false;
      });
    }
    return Object.keys(errors).length ? errors : null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}
