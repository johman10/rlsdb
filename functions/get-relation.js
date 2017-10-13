import pluralize from 'pluralize';
import { getClassName, getClass } from 'helpers/class-helper';

// getRelation('hasOne', Movie);
// getRelation('hasMany', Movie);
// getRelation('belongsTo', Movie);
// getRelation('belongsToMany', Movie);
export default function getRelation (classInstance, type, relationClass) {
  const classObject = getClass(classInstance);
  switch(type) {
  case 'hasOne':
    return getHasOne(classInstance, relationClass);
  case 'hasMany':
    return getHasMany(classInstance, relationClass);
  case 'belongsTo':
    return getBelongsTo(classInstance, classObject, relationClass);
  case 'belongsToMany':
    return getBelongsToMany(classInstance, classObject, relationClass);
  }
}

function getHasOne (classInstance, relationClass) {
  const relationKey = getClassName(relationClass).toLowerCase();
  const relation = classInstance.record[relationKey];
  return relationClass.find(relation);
}

function getHasMany (classInstance, relationClass) {
  const relationClassName = getClassName(relationClass);
  const relationKey = pluralize.plural(relationClassName).toLowerCase();
  const relation = classInstance.record[relationKey];

  if (relation) {
    return relation.map(id => relationClass.find(id));
  }

  return [];
}

function getBelongsTo (classInstance, belongsToClass, relationClass) {
  const { singularBelongsTo, pluralBelongsTo } = getBelongsToData(belongsToClass);

  const singularResult = relationClass.findBy(singularBelongsTo, classInstance.record.id);
  const pluralResult = relationClass.findBy(pluralBelongsTo, classInstance.record.id);
  return singularResult || pluralResult;
}

function getBelongsToMany(classInstance, belongsToClass, relationClass) {
  const { singularBelongsTo, pluralBelongsTo } = getBelongsToData(belongsToClass);

  const singularResult = relationClass.where(singularBelongsTo, classInstance.record.id);
  const pluralResult = relationClass.where(pluralBelongsTo, classInstance.record.id);
  return [].concat(singularResult, pluralResult);
}

function getBelongsToData (belongsToClass) {
  const belongsToClassName = getClassName(belongsToClass);
  const singularBelongsTo = pluralize.singular(belongsToClassName).toLowerCase();
  const pluralBelongsTo = pluralize.plural(belongsToClassName).toLowerCase();

  return { singularBelongsTo, pluralBelongsTo };
}
