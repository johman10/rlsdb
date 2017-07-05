import { localStorageRecordKeys } from 'helpers/local-storage-helper';
import { getTableName, stringToRecord, getClass } from 'helpers/class-helper';

export default function findAll (object) {
  const classObject = getClass(object);
  const tableName = getTableName(classObject);
  const recordKeys = localStorageRecordKeys(tableName);
  return recordKeys.map(storageKey => stringToRecord(classObject, localStorage[storageKey]));
}
