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

export function getClassName (classObject) {
  return classObject.name;
}

export function getTableName (classObject) {
  const className = getClassName(classObject).toLowerCase();
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
