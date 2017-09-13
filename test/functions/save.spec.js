import File from 'test/classes/file';

let tableName = 'files';
let savedRecord;
let expectedId;

describe('save', () => {
  beforeEach(() => {
    localStorage.clear();
    const savedId = 100;
    localStorage[`${tableName}LastId`] = savedId;
    expectedId = savedId + 1;
    savedRecord = new File({ data: 1 }).save();
  });

  it('saves the data in localStorage', () => {
    expect(localStorage[`${tableName}${savedRecord.id}`]).to.exist;
  });

  it('saves the saved id for future reference', () => {
    expect(localStorage[`${tableName}LastId`]).to.equal(savedRecord.id.toString());
  });

  it('get the expected ID', () => {
    expect(savedRecord.id).to.equal(expectedId);
  });

  it('sets the saved key on the returned value', () => {
    expect(savedRecord.saved).to.be.true;
  });

  it('sets createdAt and updatedAt on the returned value', () => {
    expect(savedRecord.createdAt).to.exist;
    expect(savedRecord.updatedAt).to.exist;
  });

  it('returns an instance of the right constructor', () => {
    expect(savedRecord.constructor).to.equal(File);
  });

  it('doesn\'t save is validations fail', () => {
    
  });
});
