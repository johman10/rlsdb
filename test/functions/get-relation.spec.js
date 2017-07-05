import File from 'test/classes/file';
import Movie from 'test/classes/movie';

let fileRecord;
let firstMovieRecord;
let secondMovieRecord;

describe('getRelation', () => {
  beforeEach(() => {
    localStorage.clear();
    firstMovieRecord = new Movie({ testData: 'hello' }).save();
    secondMovieRecord = new Movie({ testData: 'hello' }).save();
    fileRecord = new File();
  });

  it('is able to handle an has one relation', () => {
    fileRecord.record.movie = firstMovieRecord.id;
    const relationData = fileRecord.getRelation('hasOne', Movie);
    expect(relationData).to.be.an.instanceof(Movie);
  });

  it('is able to handle an has many relation', () => {
    fileRecord.record.movies = [firstMovieRecord.id, secondMovieRecord.id];
    const relationData = fileRecord.getRelation('hasMany', Movie);
    expect(relationData).to.be.an.instanceof(Array);
    expect(relationData[0]).to.be.an.instanceof(Movie);
    expect(relationData[1]).to.be.an.instanceof(Movie);
  });

  it('is able to handle a belongs to relation', () => {
    fileRecord.save();
    firstMovieRecord.record.file = fileRecord.id;
    firstMovieRecord.save();

    const relationData = fileRecord.getRelation('belongsTo', Movie);
    expect(relationData).to.be.an.instanceof(Movie);
    expect(relationData.file).to.equal(fileRecord.id);
  });

  it('is able to handle an belongs to many relation', () => {
    fileRecord.save();
    firstMovieRecord.record.file = fileRecord.id;
    secondMovieRecord.record.file = fileRecord.id;
    firstMovieRecord.save();
    secondMovieRecord.save();

    const relationData = fileRecord.getRelation('belongsToMany', Movie);
    expect(relationData).to.be.an.instanceof(Array);
    expect(relationData[0]).to.be.an.instanceof(Movie);
    expect(relationData[1]).to.be.an.instanceof(Movie);
    expect(relationData[0].file).to.equal(fileRecord.id);
    expect(relationData[1].file).to.equal(fileRecord.id);
  });
});
