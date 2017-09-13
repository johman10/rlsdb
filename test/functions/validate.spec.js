import ClassWithOneValidations from 'test/classes/validate/class-with-one-validations';
import ClassWithMultipleValidations from 'test/classes/validate/class-with-multiple-validations';
import ClassWithoutValidations from 'test/classes/validate/class-without-validations';

describe('validate', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('if one validations are defined', () => {
    beforeEach(() => {
      new ClassWithOneValidations({ data: 'string', otherValue: 'string3' }).save();
    });

    it('should return false if validation rejects', () => {
      const nonSavedClassWithOneValidations = new ClassWithOneValidations({ data: 'string' });
      const result = nonSavedClassWithOneValidations.validate();
      expect(result).to.be.false;
    });

    it('should return true if validation passes', () => {
      const nonSavedClassWithOneValidations = new ClassWithOneValidations({ data: 'string2' });
      const result = nonSavedClassWithOneValidations.validate();
      expect(result).to.be.true;
    });
  });

  describe('if multiple validations are defined', () => {
    beforeEach(() => {
      new ClassWithMultipleValidations({ data: 'string' }).save();
    });

    it('should return false if validation rejects', () => {
      const nonSavedClassWithMultipleValidations = new ClassWithMultipleValidations({ data: 'string' });
      const result = nonSavedClassWithMultipleValidations.validate();
      expect(result).to.be.false;
    });

    it('should return true if validation passes', () => {
      const nonSavedClassWithMultipleValidations = new ClassWithMultipleValidations({ data: 'string2', test: 'hallo' });
      const result = nonSavedClassWithMultipleValidations.validate();
      expect(result).to.be.true;
    });
  });

  describe('if no validations are defined', () => {
    beforeEach(() => {
      new ClassWithoutValidations({ data: 'string' }).save();
    });

    it('should return true', () => {
      const nonSavedClassWithoutValidations = new ClassWithoutValidations({ data: 'string' });
      const result = nonSavedClassWithoutValidations.validate();
      expect(result).to.be.true;
    });
  });
});
