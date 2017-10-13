import File from 'test/classes/file';
import uniqueValidation from 'validations/unique';

let validRecord;
let invalidRecord;

describe('unique', () => {
  beforeEach(() => {
    localStorage.clear();
    new File({ data: 'test', something: 'tested',  very: { deeply: { nested: { key: 123 }}}, arrayValue: ['test1', 'test2']}).save();
    invalidRecord = new File({ data: 'test', something: 'tested',  very: { deeply: { nested: { key: 123 }}}, arrayValue: ['test2', 'test1']});
    validRecord = new File({ data: 'test123', something: 'tested213',  very: { deeply: { nested: { key: 1234 }}}, arrayValue: ['test3', 'test4']});
  });

  describe('when there is a single validation', () => {
    it('should return false if the value is not unique', () => {
      const result = uniqueValidation(invalidRecord, 'data');
      expect(result).to.be.false;
    });

    it('should return true if the value is unique', () => {
      const result = uniqueValidation(validRecord, 'data');
      expect(result).to.be.true;
    });
  });

  describe('when there are nested validations', () => {
    it('should return false if the value is not unique', () => {
      const result = uniqueValidation(invalidRecord, 'very.deeply.nested.key');
      expect(result).to.be.false;
    });

    it('should return true if the value is unique', () => {
      const result = uniqueValidation(validRecord, 'very.deeply.nested.key');
      expect(result).to.be.true;
    });
  });

  describe('when the value is an object', () => {
    it('should return false if the value is not unique', () => {
      const result = uniqueValidation(invalidRecord, 'very.deeply');
      expect(result).to.be.false;
    });

    it('should return true if the value is unique', () => {
      const result = uniqueValidation(validRecord, 'very.deeply');
      expect(result).to.be.true;
    });
  });

  describe('when the value is an array', () => {
    it('should return false if the values of the array are not unique', () => {
      const result = uniqueValidation(invalidRecord, 'arrayValue');
      expect(result).to.be.false;
    });

    it('should return true if the values of the array are unique', () => {
      const result = uniqueValidation(validRecord, 'arrayValue');
      expect(result).to.be.true;
    });
  });

  describe('when there are multiple validations', () => {
    it('should return false if the value is not unique', () => {
      const result = uniqueValidation(invalidRecord, ['data', 'something', 'very.deeply.nested.key']);
      expect(result).to.be.false;
    });

    it('should return true if the values of the array are unique', () => {
      const result = uniqueValidation(validRecord, ['data', 'something', 'very.deeply.nested.key']);
      expect(result).to.be.true;
    });
  });
});
