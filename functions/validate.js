import validationFunctions from 'validations/index';

export default function (classInstance) {
  if (!classInstance.validations) return true;
  const validations = classInstance.validations();
  const validationNames = Object.keys(validations);
  const validationResults = [];

  validationNames.forEach((validationName) => {
    const validationDetails = validations[validationName];
    const isValid = validationFunctions[validationName](classInstance, validationDetails);
    validationResults.push(isValid);
  });

  return validationResults.every(result => result);
}
