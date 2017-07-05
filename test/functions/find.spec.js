import File from 'test/classes/file';

let fileRecord;

describe('find', () => {
  beforeEach(() => {
    localStorage.clear();
    fileRecord = new File({ data: 'string' }).save();
  });

  describe('with an existing ID', () => {
    let result;

    beforeEach(() => {
      result = File.find(fileRecord.id);
    });

    it('returns an instance with the right constructor', () => {
      expect(result).to.be.an.instanceof(File);
    });

    it('returns the right data', () => {
      expect(result.data).to.equal('string');
    });
  });

  describe('with an NOT existing ID', () => {
    it('returns undefined', () => {
      const nonExistingId = fileRecord.id + 1;
      const result = File.find(nonExistingId);
      expect(result).to.not.exist;
    });
  });
});
