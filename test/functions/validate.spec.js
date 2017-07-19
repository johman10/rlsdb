import File from 'test/classes/file';

let nonSavedFile;
let result;

describe('validate', () => {
  beforeEach(() => {
    localStorage.clear();
    new File({ data: 'string', otherValue: 'string3' }).save();
  });

  it('should return false if validation fails', () => {
    nonSavedFile = new File({ data: 'string' }, { validations: { unique: 'data' }});
    result = nonSavedFile.validate();
    expect(result).to.be.false;
  });

  it('should return true if validation succeeds', () => {
    nonSavedFile = new File({ data: 'string2' }, { validations: { unique: 'data' }});
    result = nonSavedFile.validate();
    expect(result).to.be.true;
  });

  it('should return true if no validation defined', () => {
    nonSavedFile = new File({ data: 'string' });
    result = nonSavedFile.validate();
    expect(result).to.be.true;
  });

  it('should work with multiple validations', () => {
    nonSavedFile = new File({ data: 'string' }, { validations: { unique: 'data' }});
    result = nonSavedFile.validate();
    expect(result).to.be.false;
  });
});
