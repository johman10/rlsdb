import { getNestedValue } from 'helpers/nested-key-helper';
import deepEqual from 'deep-equal';

export function recordsFilter (records, key, value) {
  return records.filter(record => keyValueFilter(record, key, value));
}

function keyValueFilter (record, key, value) {
  const recordValue = getNestedValue(record, key);

  const isObject = getType(recordValue) === 'object' && getType(value) === 'object';
  const isArray = Array.isArray(recordValue) && Array.isArray(value);
  if (isObject || isArray) {
    recordValue.sort();
    value.sort();
  }

  return deepEqual(recordValue, value, { strict: true });
}

function getType (value) {
  return toString(value).slice(8, -1);
}
