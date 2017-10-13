import File from 'test/classes/file';
import requiredValidation from 'validations/required';

let record;

describe('required', () => {
  beforeEach(() => {
    record = new File({
      data: 'test',
      something: 'tested',
      very: {
        deeply: {
          nested: {
            key: 123
          }
        }
      },
      emptyObject: {},
      filledArray: ['test'],
      emptyArray: []
    });
  });

  describe('when value is object', () => {
    it('should return false if the object is empty', () => {
      const result = requiredValidation(record, 'emptyObject');
      expect(result).to.be.false;
    });

    it('should return false if the object contains keys', () => {
      const result = requiredValidation(record, 'very');
      expect(result).to.be.true;
    });
  });

  describe('when value is array', () => {
    it('should return false if the array is empty', () => {
      const result = requiredValidation(record, 'emptyArray');
      expect(result).to.be.false;
    });

    it('should return false if the array contains values', () => {
      const result = requiredValidation(record, 'filledArray');
      expect(result).to.be.true;
    });
  });

  describe('when there is a single validation', () => {
    it('should return false if the key was not specified', () => {
      const result = requiredValidation(record, 'version');
      expect(result).to.be.false;
    });

    it('should return true if the key was defined', () => {
      const result = requiredValidation(record, 'data');
      expect(result).to.be.true;
    });
  });

  describe('when there are multiple validations', () => {
    it('should return false if one of them is not defined', () => {
      const result = requiredValidation(record, ['version', 'data']);
      expect(result).to.be.false;
    });

    it('should return false if all of them are not defined', () => {
      const result = requiredValidation(record, ['version', 'test']);
      expect(result).to.be.false;
    });

    it('should return true if all of them are defined', () => {
      const result = requiredValidation(record, ['data', 'very.deeply', 'something']);
      expect(result).to.be.true;
    });
  });

  describe('when there is a nested validation', () => {
    it('should return false if the key was not specified', () => {
      const result = requiredValidation(record, 'very.deeply.nested.key.that.does.not.exist');
      expect(result).to.be.false;
    });

    it('should return true if the key was defined', () => {
      const result = requiredValidation(record, 'very.deeply.nested.key');
      expect(result).to.be.true;
    });

    it('should return true on all the nested levels', () => {
      let result = requiredValidation(record, 'very');
      expect(result).to.be.true;
      result = requiredValidation(record, 'very.deeply');
      expect(result).to.be.true;
      result = requiredValidation(record, 'very.deeply.nested');
      expect(result).to.be.true;
      result = requiredValidation(record, 'very.deeply.nested.key');
      expect(result).to.be.true;
    });
  });
});
