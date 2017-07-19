import { localStorageRecordKey } from 'helpers/local-storage-helper.js';
import { getTableName } from 'helpers/class-helper';

export default function (classObject, id) {
  const tableName = getTableName(classObject);
  const localStorageKey = localStorageRecordKey(tableName, id);
  localStorage.removeItem(localStorageKey);
}
