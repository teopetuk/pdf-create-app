import _ from 'lodash';

interface ParsedEnvObj {
  [key: string]: string | ParsedEnvObj;
}

/**
 * Asserts the config field value is a string
 */
export function getRequired(config: ParsedEnvObj, propPath: string, _msg?: string): string {
  const result = _.get(config, propPath);
  if (typeof result === 'string') return result;

  const msg =
    _msg ||
    (result ? `Required config field ".${propPath}" is not a string` : `Missing required config field ".${propPath}"`);
  throw new Error(msg);
}

/**
 * Asserts env-variable is a string
 */
export function requireEnv(name: string): string {
  const result = process.env[name];
  if (typeof result === 'string') return result;

  const msg = `Missing required env variable "${name}"`;
  throw new Error(msg);
}

/**
 * Creates object from .env lines with prefix.
 * Example:
 *  .env
 *    SOME_PREFIX_OBJ1_VAL1=1
 *    SOME_PREFIX_OBJ2_VAL2=2_2
 *
 *  parseEnv('SOME_PREFIX') to be
 *    {
 *      OBJ1: {VAL1: '1'},
 *      OBJ2: {VAL2: '2_2'},
 *    }
 */
export function parseEnv(prefix: string, delimiter?: string): ParsedEnvObj {
  const result = {};
  for (const name in process.env) {
    if (name.startsWith(prefix)) {
      const objPath = name
        .slice(prefix.length)
        .split(delimiter || '_')
        .filter(Boolean)
        .join('.');
      _.set(result, objPath, process.env[name]);
    }
  }
  return result;
}
