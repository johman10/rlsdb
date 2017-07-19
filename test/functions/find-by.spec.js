import File from 'test/classes/file';

let fileRecord;
let result;
let filterKey;
let filterValue;

describe('findBy', () => {
  beforeEach(() => {
    localStorage.clear();
    fileRecord = new File({ data: 'string', version: 1, deep: { value: 1 } }).save();
    new File({ data: 'string', version: 2 }).save();
    filterKey = 'data';
    filterValue = 'string';
  });

  it('should return only one record', () => {
    result = File.findBy(filterKey, filterValue);
    expect(result).to.be.an.instanceof(File);
    expect(result.version).to.equal(fileRecord.version);
  });

  it('should only return a record with matching key value', () => {
    result = File.findBy(filterKey, filterValue);
    expect(result[filterKey]).to.equal(filterValue);
  });

  it('accepts nested value seperated by a dot', () => {
    result = File.findBy('deep.value', 1);
    expect(result).to.be.an.instanceof(File);
    expect(result.deep.value).to.equal(1);
  });

  it('should not return a record if the value type doesn\'t match', () => {
    result = File.findBy('version', '1');
    expect(result).to.be.undefined;
  });
});
