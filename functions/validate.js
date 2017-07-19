import validationFunctions from 'validations/index';

export default function (classInstance) {
  const validations = classInstance.options.validations;
  if (!validations) return true;
  const validationNames = Object.keys(validations);
  const validationResults = [];
  validationNames.forEach((validationName) => {
    const validationDetails = validations[validationName];
    let isValid;
    if (validationDetails.constructor === String) {
      isValid = validationFunctions[validationName](classInstance, validationDetails);
    } else {
      isValid = validationFunctions[validationName](classInstance, ...validationDetails);
    }
    validationResults.push(isValid);
  });
  return validationResults.every(result => result);
}
