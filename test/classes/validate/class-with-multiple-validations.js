import RLSDB from 'dist/index';

class ClassWithMultipleValidations extends RLSDB {
  constructor(record = {}) {
    super(record);
  }

  validations () {
    return {
      unique: 'data',
      required: 'test'
    };
  }
}

export default ClassWithMultipleValidations;
