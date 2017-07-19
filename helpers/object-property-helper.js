export function assignRecordProperties (classInstance) {
  if (hasNoRecord(classInstance)) return;

  const recordKeys = Object.keys(classInstance.record);
  recordKeys.forEach((recordKey) => {
    if (!classInstance.hasOwnProperty(recordKey)) {
      Object.defineProperty(classInstance, recordKey, { get: function() { return classInstance.record[recordKey]; } });
    }
  });
}

function hasNoRecord (classInstance) {
  return !(classInstance.record instanceof Object);
}
