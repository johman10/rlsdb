import RLSDB from 'dist/index';

class ClassWithValidations extends RLSDB {
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

export default ClassWithValidations;
