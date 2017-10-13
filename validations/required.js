import { getNestedValue } from 'helpers/nested-key-helper';

export default function (classInstance, key) {
  if (Array.isArray(key)) {
    return arrayRequired(classInstance, key);
  }
  return isValidRecord(classInstance, key);
}

function arrayRequired (classInstance, keys) {
  const isValid = [];
  keys.forEach((key) => {
    isValid.push(isValidRecord(classInstance, key));
  });
  return isValid.every(validValue => !!validValue);
}

function isValidRecord (classInstance, key) {
  const foundValue = getNestedValue(classInstance, key);

  // TODO: concider making an empty array or empty object valid (more in line with JS)
  // If the array is empty still return false;
  if (Array.isArray(foundValue)) {
    return !!foundValue.length;
  }

  // If the object is empty still return false;
  if (foundValue && typeof foundValue === 'object') {
    return !!Object.keys(foundValue).length;
  }

  return !!foundValue;
}
