import { DefaultPipe } from './default.pipe';

describe('DefaultPipe', () => {
  it('create an instance', () => {
    const pipe = new DefaultPipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('shuold return value when value is a non-empty string', () => {
      const pipe = new DefaultPipe();
      expect(pipe.transform('string', 'default')).toEqual('string');
    });

    it('shuold return value when value is an empty string', () => {
      const pipe = new DefaultPipe();
      expect(pipe.transform('', 'default')).toEqual('');
    });

    it('shuold return value when value is a non-zero number', () => {
      const pipe = new DefaultPipe();
      expect(pipe.transform(42, 'default')).toEqual(42);
    });

    it('shuold return value when value is the number "0"', () => {
      const pipe = new DefaultPipe();
      expect(pipe.transform(0, 'default')).toEqual(0);
    });

    it('shuold return defaultValue when value is undefined', () => {
      const pipe = new DefaultPipe();
      expect(pipe.transform(undefined, 'default')).toEqual('default');
    });

    it('shuold return value when value is null', () => {
      const pipe = new DefaultPipe();
      expect(pipe.transform(null, 'default')).toEqual('default');
    });
  });
});
