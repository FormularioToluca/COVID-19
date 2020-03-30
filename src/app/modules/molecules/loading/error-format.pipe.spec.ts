import { ErrorFormatPipe } from './error-format.pipe';

describe('ErrorFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new ErrorFormatPipe(null);
    expect(pipe).toBeTruthy();
  });
});
