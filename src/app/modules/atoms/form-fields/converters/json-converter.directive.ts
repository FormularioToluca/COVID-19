import { Directive, forwardRef } from '@angular/core';
import { CUSTOM_VALUE_CONVERTER, CustomValueConverter } from '../form-input/form-input.component';

@Directive({
  selector: '[rbJsonConverter]',
  providers: [{provide: CUSTOM_VALUE_CONVERTER, useExisting: forwardRef(() => JsonConverterDirective)}]
})
export class JsonConverterDirective implements CustomValueConverter {
  modelToValue(model: any): string {
    return JSON.stringify(model);
  }

  valueToModel(value: string): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      console.warn('Could not parse JSON', value, e);
      return null;
    }
  }
}
