import { Directive, forwardRef } from '@angular/core';
import { CUSTOM_VALUE_CONVERTER, CustomValueConverter } from '../form-input/form-input.component';

@Directive({
  selector: '[rbNumberConverter]',
  providers: [{provide: CUSTOM_VALUE_CONVERTER, useExisting: forwardRef(() => NumberConverterDirective)}]
})
export class NumberConverterDirective implements CustomValueConverter {
  modelToValue(model: number | null): string {
    return model === null || model === undefined ? '' : String(model);
  }

  valueToModel(value: string): number {
    if (value === 'null' || value === '') {
      return null;
    }
    return parseFloat(value);
  }
}
