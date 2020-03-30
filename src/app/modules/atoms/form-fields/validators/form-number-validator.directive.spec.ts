import { FormNumberValidatorDirective } from './form-number-validator.directive';
import { FormControl } from '@angular/forms';

describe('FormNumberValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new FormNumberValidatorDirective();
    expect(directive).toBeTruthy();
  });

  it('should validate minimum', () => {
    const directive = new FormNumberValidatorDirective();
    directive.rbMin = 6;
    expect(directive.validate(new FormControl(4))).toEqual({rbMin: 6});
    expect(directive.validate(new FormControl(6))).toBe(null);
    expect(directive.validate(new FormControl(7))).toBe(null);
  });

  it('should validate maximum', () => {
    const directive = new FormNumberValidatorDirective();
    directive.rbMax = 100;
    expect(directive.validate(new FormControl(101))).toEqual({rbMax: 100});
    expect(directive.validate(new FormControl(6))).toBe(null);
    expect(directive.validate(new FormControl(7))).toBe(null);
  });
});
