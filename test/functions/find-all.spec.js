import File from 'test/classes/file';
import Movie from 'test/classes/movie';

describe('findAll', () => {
  it('returns an array of all relevant items', () => {
    localStorage.clear();
    const savedRecords = [
      new File().save(),
      new File().save(),
      new File().save(),
      new File().save(),
      new Movie().save()
    ];
    const result = File.findAll();
    const expectedLength = savedRecords.filter(record => record.constructor === File).length;
    expect(result.length).to.equal(expectedLength);
  });

  it('returns an empty array if no items are found', () => {
    localStorage.clear();
    new Movie().save();
    const result = File.findAll();
    expect(result.length).to.equal(0);
  });
});
