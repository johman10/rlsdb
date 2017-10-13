import File from 'test/classes/file';

let fileRecord;
let result;

describe('findBy', () => {
  beforeEach(() => {
    localStorage.clear();
    fileRecord = new File({
      data: 'string',
      version: 1,
      deep: {
        value: 1
      },
      arrayValue: ['test1', 'test2'],
      arrayWithObjectValue: [
        {
          test: 'string'
        },
        'test2'
      ],
      objectValue: {
        test: 1
      },
      objectWithObjectValue: {
        nestedObject: {
          test: 'string'
        },
        other: 'test2'
      }
    }).save();
  });

  it('should return only one record', () => {
    result = File.findBy('data', 'string');
    expect(result).to.be.an.instanceof(File);
    expect(result.version).to.equal(fileRecord.version);
  });

  it('should only return a record with matching key value', () => {
    result = File.findBy('data', 'string');
    expect(result['data']).to.equal('string');
  });

  it('should be able to handle nested values', () => {
    result = File.findBy('deep.value', 1);
    expect(result).to.be.an.instanceof(File);
    expect(result.deep.value).to.equal(1);
  });

  it('should not return a record when the value types don\'t match', () => {
    result = File.findBy('version', '1');
    expect(result).to.be.undefined;

    result = File.findBy('arrayValue', { test: 'test1' });
    expect(result).to.be.undefined;

    result = File.findBy('objectValue', [1]);
    expect(result).to.be.undefined;
  });

  describe('when the value is an object', () => {
    it('should return a record when the keys and values in the object are the same', () => {
      result = File.findBy('objectValue', { test: 1 });
      expect(result).to.be.an.instanceof(File);
    });

    it('should return undefined when there are more keys than in the record', () => {
      result = File.findBy('objectValue', { test: 1, broken: true });
      expect(result).to.be.undefined;
    });

    it('should return undefined when there are less keys than in the record', () => {
      result = File.findBy('objectValue', {});
      expect(result).to.be.undefined;
    });

    it('should return undefined when the object values types don\'t match', () => {
      result = File.findBy('objectValue', { test: '1' });
      expect(result).to.be.undefined;
    });

    it('should return undefined when the object keys don\'t match', () => {
      result = File.findBy('objectValue', { broken: '1' });
      expect(result).to.be.undefined;
    });
  });

  describe('when the value is an array', () => {
    it('should return a record when the items in the array are the same', () => {
      result = File.findBy('arrayValue', ['test1', 'test2']);
      expect(result).to.be.an.instanceof(File);
    });

    it('should return a record when the items in the array are the same but in a different order', () => {
      result = File.findBy('arrayValue', ['test2', 'test1']);
      expect(result).to.be.an.instanceof(File);
    });

    it('should return undefined when there are too many items in the array', () => {
      result = File.findBy('arrayValue', ['test2', 'test1', 'test3']);
      expect(result).to.undefined;
    });

    it('should return undefined when there are less items in the array', () => {
      result = File.findBy('arrayValue', ['test2']);
      expect(result).to.undefined;
    });
  });

  describe('when the value contains and object', () => {
    describe('when the value is an array', () => {
      it('should return true if the nested object was send in correctly', () => {
        result = File.findBy('arrayWithObjectValue', [{ test: 'string' }, 'test2']);
        expect(result).to.be.an.instanceof(File);
      });

      it('should return undefined if the nested object is not the same', () => {
        result = File.findBy('arrayWithObjectValue', [{ test: 'string1' }, 'test2']);
        expect(result).to.be.undefined;
      });

      it('should return undefined if any other value is not the same', () => {
        result = File.findBy('arrayWithObjectValue', [{ test: 'string' }, 'test3']);
        expect(result).to.be.undefined;
      });

      it('should return undefined if any of the keys is not the same', () => {
        result = File.findBy('arrayWithObjectValue', [{ test1: 'string' }, 'test3']);
        expect(result).to.be.undefined;
      });
    });

    describe('when the value is an object', () => {
      it('should return true if the nested object was send in correctly', () => {
        result = File.findBy('objectWithObjectValue', { nestedObject: { test: 'string' }, other: 'test2' });
        expect(result).to.be.an.instanceof(File);
      });

      it('should return undefined if the nested object is not the same', () => {
        result = File.findBy('objectWithObjectValue', { nestedObject: { test: 'string1' }, other: 'test2' });
        expect(result).to.be.undefined;
      });

      it('should return undefined if any other value is not the same', () => {
        result = File.findBy('objectWithObjectValue', { nestedObject: { test: 'string1' }, other: 'test3' });
        expect(result).to.be.undefined;
      });
    });
  });
});
