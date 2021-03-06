# RLSDB
RLSDB stands for relational localStorage Database and is exactly that. It make it possible to create records in localStorage.

## Heads up before use
This is still under development and the API might change without notice.
No versioning is used for now until I found a good API that works for everything I want to implement.

## Why?
RLSDB started as a part of a project of mine, [tvIndexer](https://github.com/johman10/tvIndexer), and while building it I relalised it's actually better of as seperate project and so here we are.

I think this module could be great for people that want an easy to use, object oriented, client side, offline only database which can store none secret data.

Please keep in mind this is not "safe" in any way.
I created this mainly for Electron and figured to expand it from the project since it sort of made sense.
The database is always client side and could be edited by the user at any point in time.
I will try to catch as many errors a possible as gracefully as possible, but don't save API secrets and other stuff you don't want your users to know about.

## What?
RLSDB is able to:
1. [Create a record](#create-a-record)
2. [Fetch record by ID](#fetch-record-by-id)
3. [Fetch record(s) by data](#fetch-records-by-data)
4. [Fetch all records](#fetch-all-records)
5. [Fetch has-many relations](#fetch-a-relation)
6. [Fetch has-one relations](#fetch-a-relation)
7. [Fetch belongs-to relations](#fetch-a-relation)
8. [Fetch belongs-to-many relations](#fetch-a-relation)
9. [Validate records](#validate-records)
10. [Remove records](#remove-records)

RLSDB is *not* (yet) able to:
1. Make it into a singleton? (not sure if I can)

## Examples
It's easiest to understand and explain and API by some examples. So here we go!

For all the examples we use a class like this:
```js
import RLSDB from 'rlsdb';

class Example extends RLSDB {
  constructor(record) {
    super(record);
  }
}
```

### Create a record
```js
// Initaite a new record
const example = new Example();
example.testValue = 1;
// Saves the current record as an item in localStorage
// If this would be the first item that is saved it's saved as `examples1`
example.save();
```

### Fetch record by ID
You can do if a record with ID 10 exists:
```js
const example = Example.find(10);
```

### Fetch record(s) by data
```js
const example = Example.findBy('key', 'value');
const examples = Example.where('key', 'value');
const example = Example.findBy('deep.key', 'value');
const examples = Example.where('deep.key', 'value');
```

### Fetch all records
```js
const examples = Example.findAll();
```

### Handle relations
In the following examples we need something to relate to so we have an extra class like so:
```js
import RLSDB from 'rlsdb';

class Movie extends RLSDB {
  constructor(record) {
    super(record);
  }
}
```

#### Create a record with a relation
```js
const example = new Example();
const movie = new Movie();
const secondMovie = new Movie();
movie.save();
secondMovie.save();

// This would create a has-one relation
// Please note, that the key has to be singular for a has-one relation
example.movie = movie.id;

// This would create an has-many relation
// Please note, that the key has to be plural for a has-many relation
example.movies = [movie.id, secondMovie.id]
example.save();
```

#### Fetch a relation
```js
import Movie from 'path/to/class/movie';
import Example from 'path/to/class/example';

const example = Example.find(1);
const movieOneRelation = example.getRelation('hasOne', Movie);
const movieManyRelation = example.getRelation('hasMany', Movie);

const exampleBelongsToOneMovie = Movie.find(1).getRelation('belongsTo', Example);
const exampleBelongsToManyMovie = Movie.find(1).getRelation('belongsToMany', Example);
```

### Validate records
Validations should be added as a function on the class you create (see example below).
The validations that are supported right now are:
 - required
 - unique

In all validations you are able to either specify an Array or just a String.

```js
import RLSDB from 'rlsdb';

class ValidationClass from RLSDB {
  constructor(record) {
    super(record);
  }

  validations () {
    return {
      required: ['nested.value', 'key'],
      unique: 'key'
    }
  }
}
```

Records will be validated before saving the record, but you're also able to validate it yourself if you have to.
To do so just run:

```js
const isValid = new ValidationClass({ key: 'test', nested: { value: 'test' }}).validate(); // Should return true in this case
```

### Remove records
To remove records you can call `.remove()` on a class method.

If you want to remove a relation as well you have the option to send in a parameter like so:
```
File.remove([{ type: 'hasOne', class: Movie }])
```
The Array can contain any amount of items, as long as they follow the same format. The type is only allowed to be one of the relationTypes found in [the relations chapter](#handle-relations)
