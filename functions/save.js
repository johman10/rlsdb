import { localStorageRecordKey, localStorageLastIdKey } from 'helpers/local-storage-helper';
import { getClass, getTableName, getHighestId } from 'helpers/class-helper';
import { assignRecordProperties } from 'helpers/object-property-helper';

export default function save (classInstance) {
  const isInvalid = !(classInstance.validate());
  if (isInvalid) return classInstance;

  const classObject = getClass(classInstance);
  const tableName = getTableName(classObject);

  const record = buildRecord(classInstance);
  localStorage[localStorageRecordKey(tableName, record.id)] = JSON.stringify(record);
  classInstance.record = record;
  assignRecordProperties(classInstance);
  return classInstance;
}

function buildRecord (classInstance) {
  return {
    id: getRecordId(classInstance),
    ...classInstance.record,
    saved: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

function getRecordId (classInstance, offset = 0) {
  const id = classInstance.id;
  if (id) return id;

  const classObject = getClass(classInstance);
  const tableName = getTableName(classObject);
  const localStorageKey = localStorageLastIdKey(tableName);
  const lastId = Number(localStorage[localStorageKey] || 0) + offset;

  // If lastId is 0 ensure that there is no reference in localStorage to any ID
  // if there is a record start again with that ID as offset
  if (!lastId) {
    const currentLastId = getHighestId(classObject);
    if (currentLastId) {
      return getRecordId(classInstance, currentLastId);
    }
  }

  const recordId = lastId + 1;

  // If there is already an ID with the ID is going to be returned, try again
  // localStorage[`${this.tableName}${recordId}`]
  const newRecordKey = localStorageRecordKey(recordId);
  if (localStorage[newRecordKey]) {
    return getRecordId(classInstance, offset + 1);
  }

  // Update the lastIdKey to match the latest record;
  localStorage[localStorageLastIdKey(tableName)] = recordId;

  return recordId;
}
