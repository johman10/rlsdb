import validationFunctions from 'validations/index';

export default function (classInstance) {
  if (!classInstance.validations) return true;
  let validations;
  if (typeof classInstance.validations === 'function') {
    validations = classInstance.validations();
  } else {
    validations = classInstance.validations;
  }
  const validationNames = Object.keys(validations);
  const validationResults = [];

  validationNames.forEach((validationName) => {
    const validationDetails = validations[validationName];
    const isValid = validationFunctions[validationName](classInstance, validationDetails);
    validationResults.push(isValid);
  });

  return validationResults.every(result => result);
}
