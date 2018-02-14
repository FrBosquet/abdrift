# abdrify

> A zero dependency library for getting differences amongs js objects. The output is served in a semantically and human friendly way.

## Install

```
$ npm install abdrift
```

## Usage

```js
import abdrift from 'abdrift'

const obj1 = {
  "name": "abdrift",
  "version": "1.0.0",
  "description": "Get differences beetween two objects",
  "main": "index.js",
  "scripts": {
    "test": "mocha --watch ./test/test.js"
  },
  "author": "Fran Bosquet",
  "license": "ISC",
  "array": [1,2,3,4],
  "devDependencies": {
    "mocha": "^4.0.1"
  }
}

const obj2 ={
  "name": "abdriffffter",
    "version": "1.0.0",
      "description": "Get differences beetween two objects",
        "main": "index.js",
          "scripts": {
    "test": "mocha --watch ./test/test.js"
  },
  "array": [5,6,7],
  "author": "Fran Bosquet",
  "license": "MIT",
  "devDependencies": {
    "mocha": []
  }
}

console.log(abdrift(obj1, obj2)) 
/*
  OUPUT will be:

  { array:
   { '0': { difference: 'Values differ', value1: 1, value2: 5 },
     '1': { difference: 'Values differ', value1: 2, value2: 6 },
     '2': { difference: 'Values differ', value1: 3, value2: 7 },
     '3': { difference: 'Key not in second object', value1: 4 } },
  devDependencies:
   { mocha:
      { difference: 'Types differ',
        type1: 'string',
        value1: '^4.0.1',
        type2: 'object',
        value2: [] } },
  license: { difference: 'Values differ', value1: 'ISC', value2: 'MIT' },
  name:
   { difference: 'Values differ',
     value1: 'abdrift',
     value2: 'abdriffffter' } }
*/
```