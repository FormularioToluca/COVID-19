import { NumberConverterDirective } from './number-converter.directive';

describe('NumberConverterDirective', () => {
  it('should create an instance', () => {
    const directive = new NumberConverterDirective();
    expect(directive).toBeTruthy();
  });

  it('should convert to model', () => {
    const directive = new NumberConverterDirective();
    expect(directive.valueToModel('3434.65')).toEqual(3434.65);
  });

  it('should convert empty to model', () => {
    const directive = new NumberConverterDirective();
    expect(directive.valueToModel('')).toBe(null);
  });

  it('should convert to value', () => {
    const directive = new NumberConverterDirective();
    expect(directive.modelToValue(5343.1)).toEqual('5343.1');
  });

});
