export function localStorageKeys () {
  return Object.keys(localStorage);
}

export function localStorageRecordKeys (tableName) {
  return localStorageKeys().filter(key => key.startsWith(tableName) && !key.includes('LastId'));
}

export function localStorageRecordKey (tableName, id) {
  return `${tableName}${id}`;
}

export function localStorageLastIdKey (tableName) {
  return `${tableName}LastId`;
}
