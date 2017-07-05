import File from 'test/classes/file';

let filterKey;
let filterValue;
let result;

describe('where', () => {
  beforeEach(() => {
    localStorage.clear();
    new File({ data: 'string' }).save();
    new File({ data: 'string' }).save();
    filterKey = 'data';
    filterValue = 'string';
    result = File.where(filterKey, filterValue);
  });

  it('should return multiple records', () => {
    expect(result).to.be.an.instanceof(Array);
    expect(result[0]).to.be.an.instanceof(File);
    expect(result[1]).to.be.an.instanceof(File);
  });

  it('should only return records with matching key value', () => {
    expect(result[0][filterKey]).to.equal(filterValue);
    expect(result[1][filterKey]).to.equal(filterValue);
  });

  it('returns an empty array when there is no result', () => {
    result = File.where('version', 1);
    expect(result).to.be.an.instanceof(Array);
    expect(result.length).to.equal(0);
  });
});
