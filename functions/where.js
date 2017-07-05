import findAll from 'functions/find-all';
import { recordsFilter } from 'helpers/record-filter-helper';

export default function where (object, key, value) {
  const records = findAll(object);
  const filteredRecords = recordsFilter(records, key, value);
  return filteredRecords;
}
