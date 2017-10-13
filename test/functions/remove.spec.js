import File from 'test/classes/file';
import Movie from 'test/classes/movie';

describe('remove', () => {
  let fileRecord;
  let movieRecord;

  beforeEach(() => {
    localStorage.clear();
    movieRecord = new Movie({ someMovieData: 'yes' }).save();
    fileRecord = new File({ someData: 'string', movie: movieRecord.id, movies: [movieRecord.id] }).save();
  });

  it('removes the item from localStorage', () => {
    fileRecord.remove();
    expect(localStorage.getItem('files1')).to.not.exist;
  });

  it('keeps the lastId set', () => {
    fileRecord.remove();
    expect(localStorage.getItem('filesLastId')).to.exist;
  });

  describe('when trying to remove relations', () => {
    it('should be able to remove a hasOne relations', () => {
      fileRecord.remove([{ class: Movie, type: 'hasOne' }]);
      expect(localStorage.getItem('files1')).to.not.exist;
      expect(localStorage.getItem('movies1')).to.not.exist;
    });

    it('should be able to remove a hasMany relations', () => {
      fileRecord.remove([{ class: Movie, type: 'hasMany' }]);
      expect(localStorage.getItem('files1')).to.not.exist;
      expect(localStorage.getItem('movies1')).to.not.exist;
    });

    it('should be able to remove a belongsTo relations', () => {
      movieRecord.remove([{ class: File, type: 'belongsTo' }]);
      expect(localStorage.getItem('movies1')).to.not.exist;
      expect(localStorage.getItem('files1')).to.not.exist;
    });

    it('should be able to remove a belongsToMany relations', () => {
      movieRecord.remove([{ class: File, type: 'belongsToMany' }]);
      expect(localStorage.getItem('movies1')).to.not.exist;
      expect(localStorage.getItem('files1')).to.not.exist;
    });

    it('should throw an error if the remove parameter is not in the right format', () => {
      expect(() => movieRecord.remove([{ class: File }])).to.throw(Error);
      expect(() => movieRecord.remove([{ type: 'hasMany' }])).to.throw(Error);
      expect(() => movieRecord.remove([{}])).to.throw(Error);
      expect(() => movieRecord.remove('test')).to.throw(Error);
    });
  });
});
