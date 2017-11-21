const differ = require('./index')

const obj1 = {
  "name": "differ",
  "version": "1.0.0",
  "description": "Get differences beetween two objects",
  "main": "index.js",
  "scripts": {
    "test": "mocha --watch ./test/test.js"
  },
  "author": "Fran Bosquet",
  "license": "ISC",
  "devDependencies": {
    "mocha": "^4.0.1"
  }
}

const obj2 ={
  "name": "difer",
    "version": "1.0.0",
      "description": "Get differences beetween two objects",
        "main": "index.js",
          "scripts": {
    "test": "mocha --watch ./test/test.js"
  },
  "author": "Fran Bosquet",
    "license": "ISC",
    "devDependencies": {
    "mocha": []
  }
}


console.log(differ.getDiffs(obj1, obj2))