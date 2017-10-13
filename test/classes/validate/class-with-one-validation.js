import RLSDB from 'dist/index';

class ClassWithOneValidation extends RLSDB {
  constructor(record = {}) {
    super(record);
  }

  validations () {
    return {
      unique: 'data'
    };
  }
}

export default ClassWithOneValidation;
