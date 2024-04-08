import {parseEnv, getRequired, requireEnv} from '../index';

jest.unmock('../index');

describe('env utils', () => {
  beforeEach(() => {
    process.env = {
      SOME_PREFIX_OBJ1_VAL1: '1',
      SOME_PREFIX_OBJ2_VAL2: '2_2',
      ANOTHER_PREFIX_OBJ2_VAL2: 'xz',
    };
  });

  it('requireEnv the config field value to be a string', () => {
    expect(requireEnv('SOME_PREFIX_OBJ1_VAL1')).toBe('1');
    expect(() => requireEnv('SOME_PREFIX_OBJ1_X')).toThrowErrorMatchingInlineSnapshot(`"Missing required env variable "SOME_PREFIX_OBJ1_X""`);
  });

  it('parseEnv creates object from .env', () => {
    const config = parseEnv('SOME_PREFIX');
    expect(config).toMatchSnapshot();

    expect(getRequired(config, 'OBJ1.VAL1')).toBe('1');
    expect(getRequired(config, 'OBJ2.VAL2')).toBe('2_2');
    expect(() => getRequired(config, 'OBJ1.X')).toThrowErrorMatchingInlineSnapshot(`"Missing required config field ".OBJ1.X""`);
    expect(() => getRequired(config, 'Y.X')).toThrowErrorMatchingInlineSnapshot(`"Missing required config field ".Y.X""`);
  });
});
