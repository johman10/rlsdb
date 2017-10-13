export function getNestedValue (record, key) {
  const splittedKey = splitKey(key);
  let currentValidationLevel = record;
  splittedKey.forEach((keyPart) => {
    if (currentValidationLevel) {
      currentValidationLevel = currentValidationLevel[keyPart];
    }
  });
  return currentValidationLevel;
}

export function splitKey (key) {
  return key.split('.');
}
