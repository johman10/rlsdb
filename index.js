import { assignRecordProperties } from 'helpers/object-property-helper';

import findAll from 'functions/find-all';
import findBy from 'functions/find-by';
import where from 'functions/where';
import find from 'functions/find';
import getRelation from 'functions/get-relation';
import save from 'functions/save';
import validate from 'functions/validate';
import remove from 'functions/remove';

export default class RLSDB {
  constructor (record = {}) {
    this.record = record;
    assignRecordProperties(this);
  }

  static findAll () { return findAll(this, ...arguments); }
  static findBy () { return findBy(this, ...arguments); }
  static where () { return where(this, ...arguments); }
  static find () { return find(this, ...arguments); }

  getRelation () { return getRelation(this, ...arguments); }
  save () { return save(this, ...arguments); }
  validate () { return validate(this, ...arguments); }
  remove () { return remove(this, ...arguments); }
}
