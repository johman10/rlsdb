import RLSDB from 'dist/index';

class ClassWithoutValidations extends RLSDB {
  constructor(record = {}) {
    super(record);
  }
}

export default ClassWithoutValidations;
