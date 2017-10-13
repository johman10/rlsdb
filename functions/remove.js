import { getTableName } from 'helpers/class-helper';
import { localStorageRecordKey } from 'helpers/local-storage-helper';

export default function (classInstance, relationData = []) {
  if (!Array.isArray(relationData)) throw new Error('options.relationData should be of type Array');

  relationData.forEach(relationObject => {
    if (!relationObject.class || !relationObject.type) {
      throw new Error('the relationData array shoud contain objects with a class and type, like this: `{ class: Movie, type: \'hasMany\' }`');
    }
    const relation = classInstance.getRelation(relationObject.type, relationObject.class);
    if (relation) {
      if (Array.isArray(relation)) {
        relation.forEach(relationRecord => {
          relationRecord.remove();
        });
      } else {
        relation.remove();
      }
    }
  });

  const tableName = getTableName(classInstance);
  const recordKey = localStorageRecordKey(tableName, classInstance.id);
  localStorage.removeItem(recordKey);
}
