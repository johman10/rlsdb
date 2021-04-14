import File from 'test/classes/file';
import classWithOneValidation from 'test/classes/validate/class-with-one-validation';

let tableName = 'files';
let savedRecord;
let expectedId;
let invalidRecord;

describe('save', () => {
  beforeEach(() => {
    localStorage.clear();
    const savedId = 100;
    localStorage[`${tableName}LastId`] = savedId;
    expectedId = savedId + 1;
    savedRecord = new File({ data: 1 }).save();
  });

  describe('the returned data', () => {
    it('includes the expected ID', () => {
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
  });

  describe('localStorage', () => {
    it('includes the record', () => {
      expect(localStorage[`${tableName}${savedRecord.id}`]).to.exist;
    });

    it('includes the saved id for future reference', () => {
      expect(localStorage[`${tableName}LastId`]).to.equal(savedRecord.id.toString());
    });
  });

  describe('updating', () => {
    it('is able to update an existing key on a record', () => {
      savedRecord.record.data = 'test';
      savedRecord = savedRecord.save();
      expect(savedRecord.data).to.equal('test');
    });

    it('is able to add a new key to an existing record', () => {
      savedRecord.record.data2 = 'test';
      savedRecord = savedRecord.save();
      expect(savedRecord.data2).to.equal('test');
    });
  });

  describe('with validations', () => {
    beforeEach(() => {
      invalidRecord = new classWithOneValidation({ data: 'test' });
    });

    it('does save if validations pass', () => {
      expect(invalidRecord.validate()).to.be.true;
      const unsavedRecord = invalidRecord.save();
      expect(unsavedRecord.id).to.exist;
    });

    it('doesn\'t save if validations are rejected', () => {
      new classWithOneValidation({ data: 'test' }).save();
      expect(invalidRecord.validate()).to.be.false;
      const unsavedRecord = invalidRecord.save();
      expect(unsavedRecord.id).to.be.undefined;
    });

    describe.only('updating', () => {
      it('is able to update an existing key on a record', () => {
        new classWithOneValidation({ data: 'test' }).save();
        savedRecord = new classWithOneValidation({ data: 'test1' }).save();
        console.log(savedRecord);
        savedRecord.record.data = 'test';
        const changedRecord = savedRecord.save();
        console.log(changedRecord)
        expect(changedRecord.data).to.equal('test');
      });
    });
  });
});
