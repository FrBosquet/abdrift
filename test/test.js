const assert = require('assert')
const differ = require('../src/index')

describe('Library to get differences between objects', function(){
  describe('Auxiliary functions', function(){
    it('It should return every key in a pair of objects', function(){
      const obj1 = {a: true, c: true}
      const obj2 = {b: true, c: true}
      const expect = ['a', 'b', 'c']
      assert.deepEqual(differ.everyKeyIn(obj1, obj2), expect)
    })

    it('It should return a key miss message 1/2', function(){
      const expect = {
        difference: 'Key not in first object',
        value2: 6
      }
      assert.deepEqual(
        differ.firstKeyMissed(6),
        expect 
      )
    })

    it('It should return a key miss message 2/2', function () {
      const expect = {
        difference: 'Key not in second object',
        value1: 6
      }
      assert.deepEqual(
        differ.secondKeyMissed(6),
        expect
      )
    })

    it('It should return a types differ message', function () {
      expect = {
        difference: 'Types differ',
        type1: 'number', value1: 3,
        type2: 'string', value2: 'foo'
      } 
      assert.deepEqual(
        differ.typesDiffer('number', 3, 'string', 'foo'),
        expect
      )
    })

    it('It should return null when two values are equal', function(){
      assert.equal(differ.compare('number', 5, 5), null)
    })
    
    it('It should return a values differ message 1/3', function(){
      const expect = {
        difference: 'Values differ',
        value1: 5,
        value2: 4
      }
      assert.deepEqual(differ.compareValues(5, 4), expect)
    })

    it('It should return a values differ message 2/3', function () {
      const expect = {
        difference: 'Values differ',
        value1: 'foo',
        value2: 'bar'
      }
      assert.deepEqual(differ.compareValues('foo', 'bar'), expect)
    })

    it('It should return a values differ message 3/3', function () {
      const expect = {
        difference: 'Values differ',
        value1: true,
        value2: false
      }
      assert.deepEqual(differ.compareValues(true, false), expect)
    })

    it('It should return null when two functions are equal', function(){
      assert.deepEqual(differ.compareFunctions(()=>10,()=>10), null)
    })

    it('It should return a functions differ message', function(){
      assert.deepEqual(differ.compareFunctions(()=>10,()=>20), {
        difference: 'Functions differ',
        func1: (()=>10).toString(),
        func2: (()=>20).toString()
      })
    })
  })

  describe('Simple object comparison', function(){
    it('It should return null when two numbers are equal', function(){
      const obj1 = { a: 3}
      const obj2 = { a: 3}
      assert.deepEqual(differ.getDiffs( obj1, obj2), null)
    })
    
    it('It should return { key: {difference...}}} when two numbers differ', function () {
      const obj1 = { a: 3 }
      const obj2 = { a: 2 }
      const expect = {
        a : {
          difference: 'Values differ',
          value1: 3,
          value2: 2
        }
      }
      assert.deepEqual(differ.getDiffs(obj1, obj2), expect)
    })

    it('It should return null when two strings are equal', function () {
      const obj1 = { a: 'foo' }
      const obj2 = { a: 'foo' }
      assert.deepEqual(differ.getDiffs(obj1, obj2), null)
    })

    it('It should return { key: {difference...}} when two strings differ', function () {
      const obj1 = { a: 'foo' }
      const obj2 = { a: 'bar' }
      const expect = {
        a: {
          difference: 'Values differ',
          value1: 'foo',
          value2: 'bar'
        }
      }
      assert.deepEqual(differ.getDiffs(obj1, obj2), expect)
    })

    it('It should return null when two booleans are equal', function () {
      const obj1 = { a: true }
      const obj2 = { a: true }
      assert.deepEqual(differ.getDiffs(obj1, obj2), null)
    })

    it('It should return { key: { differece...}} when two booleans differ', function () {
      const obj1 = { a: true }
      const obj2 = { a: false }
      const expect = {
        a: {
          difference: 'Values differ',
          value1: true,
          value2: false
        }
      }
      assert.deepEqual(differ.getDiffs(obj1, obj2), expect)
    })

    it('It should return null when two functions are equal', function () {
      const obj1 = { a: () => 10 }
      const obj2 = { a: () => 10 }
      assert.deepEqual(differ.getDiffs(obj1, obj2), null)
    })

    it('It should return { key: { difference...}} when two functions differ', function () {
      const obj1 = { a: () => 10 }
      const obj2 = { a: function( k ){ return k * 2}}
      const expect = {
        a: {
          difference: 'Functions differ',
          func1: obj1.a.toString(),
          func2: obj2.a.toString()
        }
      }
      assert.deepEqual(differ.getDiffs(obj1, obj2), expect)
    })

    it('It should return {difference: "types differ", type1..., value1..., type2..., value2...} when types doesn´t coincide', function(){
      const obj1 = { a: 'foo' }
      const obj2 = { a: 2 }
      const expect = {
        a: {
          difference: 'Types differ', type1: 'string', value1: 'foo', type2: 'number', value2: 2
        }
      }
      assert.deepEqual(differ.getDiffs(obj1, obj2), expect)
    })

    it('It should return {difference: "key missed in first object", value2: value2} when the key is not present in first object', function(){
      const obj1 = {a: 3}
      const obj2 = {a: 3, b: 6}
      const expect = { b: { difference: 'Key not in first object', value2: 6 } }
      assert.deepEqual(differ.getDiffs(obj1, obj2), expect)
    })

    it('It should return {difference: "key missed in second object", value1: value1} when the key is not present in second object', function(){
      const obj1 = {a: 3, b: 6}
      const obj2 = {a: 3}
      const expect = { b: { difference: 'Key not in second object', value1: 6 } }
      assert.deepEqual(differ.getDiffs(obj1, obj2), expect)
    })
  })

  describe('Array comparison', function () {
    it('It should return null when two arrays are equal', function () {
      const obj1 = { a: [2, 4, 5, 7, 8, 9] }
      const obj2 = { a: [2, 4, 5, 7, 8, 9] }
      assert.deepEqual(differ.getDiffs(obj1, obj2), null)
    })

    it('It should return {key: {index: {difference...}}}} when two arrays differ', function () {
      const obj1 = { a: [2, 4, 5, 7, 3, 9] }
      const obj2 = { a: [2, 4, 5, 7, 8, 9] }
      const expect = { a: 
        { 
          '4': {
            difference: 'Values differ',
            value1: 3,
            value2: 8
          } 
        } 
      }
      assert.deepEqual(differ.getDiffs(obj1, obj2), expect)
    })

    it('It should compare different types inside an array 1/2', function(){
      const obj1 = { a: [2, 4, 5, 7, 3, 9] }
      const obj2 = { a: [2, 'four', 5, 7, 3, 9] }
      const expect = {
        a: {
          '1' : {
            difference: 'Types differ',
            type1: 'number',
            type2: 'string',
            value1: 4,
            value2: 'four'
          }
        }
      }
      assert.deepEqual(differ.getDiffs(obj1, obj2), expect)
    })

    it('It should compare different types inside an array 2/2', function () {
      const obj1 = { a: [2, 4, 5, 7, 3, 9] }
      const obj2 = { a: [2, [3,4,5], 5, 7, 3, 9] }
      const expect = {
        a: {
          '1': {
            difference: 'Types differ',
            type1: 'number',
            type2: 'object',
            value1: 4,
            value2: [3, 4, 5]
          }
        }
      }
      assert.deepEqual(differ.getDiffs(obj1, obj2), expect)
    })
  })

  describe('Nested object comparison', function(){
    it('It should return null when two objects with nested objects inside are equals', function(){
      const obj1 = {
        title: 'foo',
        values: {
          regular: 8,
          special: 10
        },
        checked: true
      }

      const obj2 = {
        title: 'foo',
        values: {
          regular: 8,
          special: 10
        },
        checked: true
      }

      assert.deepEqual(differ.getDiffs(obj1, obj2), null)
    })

    it('It should return every difference whittin nested objects, test 1/3', function(){
      const obj1 = {
        title: 'foo',
        values: {
          regular: 8,
          special: 10
        },
        checked: true
      }

      const obj2 = {
        title: 'foo',
        values: {
          regular: 8,
          special: 9
        },
        checked: true
      }

      const expect = {
        values: { 
          special: {
            difference: 'Values differ',
            value1: 10,
            value2: 9
          }
        }
      }

      assert.deepEqual(differ.getDiffs(obj1, obj2), expect)
    })

    it('It should return every difference whittin nested objects, test 2/3', function () {
      const obj1 = {
        title: 'foo',
        values: {
          regular: 8,
          special: {
            motto: "There is no special"
          }
        },
        checked: true
      }

      const obj2 = {
        title: 'bar',
        values: {
          regular: 8,
          special: 9
        },
        checked: true
      }

      const expect = {
        title: {
          difference: 'Values differ',
          value1: 'foo',
          value2: 'bar'
        },
        values: {
          special: {
            difference: 'Types differ', 
            type1: 'object',
            type2: 'number',
            value1: {
              motto: "There is no special"
            },
            value2: 9
          }
        }
      }

      assert.deepEqual(differ.getDiffs(obj1, obj2), expect)
    })

    it('It should return every difference whittin nested objects, test 3/3', function () {
      const obj1 = {
        title: 'foo',
        values: {
          regular: 8,
          special: {
            motto: "There is no special"
          }
        },
        checked: true,
        far: [3, 4, 8]
      }

      const obj2 = {
        title: 'bar',
        values: {
          regular: 8,
          special: 9
        },
        checked: false,
        near: 'yes'
      }

      const expect = {
        title: {
          difference: 'Values differ',
          value1: 'foo',
          value2: 'bar'
        },
        values: {
          special: {
            difference: 'Types differ',
            type1: 'object',
            type2: 'number',
            value1: {
              motto: "There is no special"
            },
            value2: 9
          }
        },
        checked: {
          difference: 'Values differ',
          value1: true,
          value2: false
        },
        near: {
          difference: 'Key not in first object',
          value2: 'yes'
        },
        far: {
          difference: 'Key not in second object',
          value1: [3, 4, 8]
        }
      }

      assert.deepEqual(differ.getDiffs(obj1, obj2), expect)
    })
  })
  describe('Derived isEqual function', function(){
    const obj1 = {
      name: 'John Doe',
      age: 60,
      points: [50, 10, 12],
      isActive: true,
      personalInfo: {
        city: 'Madrid',
        id: 23546282716,
        job: 'developer'
      }
    }
    const obj2 = Object.assign({}, obj1)
    const obj3 = Object.assign({}, obj1, { age: 30})
    
    it('It should return true when two objects are strictly equal', function(){
      assert.equal(differ.isEqual(obj1, obj2), true)
    })
    
    it('It should return false when two objects are not equal', function(){
      assert.equal(differ.isEqual(obj1, obj3), false)
    })
  })
})