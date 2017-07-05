export function recordsFilter (records, key, value) {
  const validRecords = [];

  records.forEach((record) => {
    const isValid = keyValueFilter(record, key, value);
    if (isValid) {
      validRecords.push(record);
    }
  });

  return validRecords;
}

function keyValueFilter (record, key, value) {
  let requestedRecordValue = record;
  key.split('.').forEach((splitKey) => {
    if (requestedRecordValue) {
      requestedRecordValue = requestedRecordValue[splitKey];
    }
  });
  if (Array.isArray(requestedRecordValue)) {
    return requestedRecordValue.includes(value);
  } else {
    return requestedRecordValue === value;
  }
}
