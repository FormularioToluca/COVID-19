import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

/* tslint:disable:directive-selector */
@Directive({
  selector: 'rb-form-chips-input[pattern]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => FormChipsInputPatternValidatorDirective),
    multi: true
  }]
})
export class FormChipsInputPatternValidatorDirective implements Validator {

  @Input() pattern;

  constructor() {
  }


  validate(c: AbstractControl): ValidationErrors | null {
    let hasInvalid = false;
    if ( c.value && this.pattern) {
       c.value.forEach(el => {
        if (!el.match(this.pattern)) {
            hasInvalid = true;
        }
       });
      if (hasInvalid) {
        return {'pattern': true};
      } else {
        return null;
      }
    }
    return null;
  }

}

