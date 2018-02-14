const differ = require('./index')

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
  "array": [1, 2, 3, 4],
  "devDependencies": {
    "mocha": "^4.0.1"
  }
}

const obj2 = {
  "name": "abdriffffter",
  "version": "1.0.0",
  "description": "Get differences beetween two objects",
  "main": "index.js",
  "scripts": {
    "test": "mocha --watch ./test/test.js"
  },
  "array": [5, 6, 7],
  "author": "Fran Bosquet",
  "license": "MIT",
  "devDependencies": {
    "mocha": []
  }
}


console.log(differ(obj1, obj2))