import { getClass } from 'helpers/class-helper';
import { getNestedValue } from 'helpers/nested-key-helper';

export default function (classInstance, validationKey) {
  if (Array.isArray(validationKey)) {
    return arrayUnique(classInstance, validationKey);
  }

  return isValidRecord(classInstance, validationKey);
}

function arrayUnique (classInstance, validationKeys) {
  const isValid = [];
  validationKeys.forEach((validationKey) => {
    isValid.push(isValidRecord(classInstance, validationKey));
  });
  return isValid.every(validValue => !!validValue);
}

function isValidRecord (classInstance, validationKey) {
  const objectClass = getClass(classInstance);
  const value = getNestedValue(classInstance, validationKey);
  return !objectClass.findBy(validationKey, value);
}
