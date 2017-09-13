export default function (classInstance, key) {
  if (Array.isArray(key)) {
    return arrayRequired(classInstance, key);
  }
  return !!classInstance[key];
}

function arrayRequired (classInstance, keys) {
  const isValid = [];
  keys.forEach((keyName) => {
    isValid.push(!!classInstance[keyName]);
  });
  return isValid.every(validValue => !!validValue);
}
