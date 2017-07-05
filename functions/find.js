import { getTableName, stringToRecord, getClass } from 'helpers/class-helper';
import { localStorageRecordKey } from 'helpers/local-storage-helper';

export default function find (object, id) {
  const classObject = getClass(object);
  const tableName = getTableName(classObject);
  const storageKey = localStorageRecordKey(tableName, id);
  return stringToRecord(classObject, localStorage[storageKey]);
}
