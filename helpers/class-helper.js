import pluralize from 'pluralize';

export function isClass (object) {
  return object instanceof Function;
}

export function getClass (object) {
  if (isClass(object)) {
    return object;
  }
  return object.constructor;
}

export function getClassName (object) {
  if (!isClass(object)) object = getClass(object);
  return object.name;
}

export function getTableName (object) {
  const className = getClassName(object).toLowerCase();
  return pluralize.plural(className);
}

export function stringToRecord (classObject, string) {
  if (string) {
    const json = JSON.parse(string);
    return new classObject(json);
  }
}

export function getHighestId (classObject) {
  const tableName = getTableName(classObject);
  const tableKeys = Object.keys(localStorage).filter(key => key.startsWith(tableName));
  const currentIds = tableKeys.map(key => parseInt(key.replace(tableName, '')));
  const sortedCurrentIds = currentIds.sort((a, b) => a < b);
  return sortedCurrentIds[0];
}
