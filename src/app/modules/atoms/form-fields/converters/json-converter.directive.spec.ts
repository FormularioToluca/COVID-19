import { JsonConverterDirective } from './json-converter.directive';

describe('JsonConverterDirective', () => {
  it('should create an instance', () => {
    const directive = new JsonConverterDirective();
    expect(directive).toBeTruthy();
  });

  it('should convert to model', () => {
    const directive = new JsonConverterDirective();
    expect(directive.valueToModel(`{"name":"test"}`)).toEqual({name: 'test'});
  });

  it('should convert to value', () => {
    const directive = new JsonConverterDirective();
    expect(directive.modelToValue({name: 'test'})).toEqual(`{"name":"test"}`);
  });
});
