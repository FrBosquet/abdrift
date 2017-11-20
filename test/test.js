const assert = require('assert')
const differ = require('../index')

describe('Library to get differences between objects', function(){
  describe('Auxiliary functions', function(){
    it('It should return every key in a pair of objects', function(){
      const obj1 = {a: true, c: true}
      const obj2 = {b: true, c: true}
      assert.deepEqual(differ.getEveryKeyIn(obj1, obj2), ['a','b','c'])
    })

    it('It should return a key miss message 1/2', function(){
      assert.deepEqual(
        differ.createFirstValueMissedMessage(6),
        {
          difference: 'Key miss in first object',
          value2: 6
        }
      )
    })

    it('It should return a key miss message 2/2', function () {
      assert.deepEqual(
        differ.createSecondValueMissedMessage(6),
        {
          difference: 'Key miss in second object',
          value1: 6
        }
      )
    })

    it('It should return a types differ message', function () {
      assert.deepEqual(
        differ.createTypesDifferMessage('number', 3, 'string', 'foo'),
        {
          difference: 'Types differ',
          type1: 'number', value1: 3, 
          type2: 'string', value2: 'foo'
        }
      )
    })

    it('It should return null when two values are equal', function(){
      assert.equal(differ.compare('number', 5, 5), null)
    })
    
    it('It should return an array with two values when they differ 1/3', function(){
      assert.deepEqual(differ.compareValues(5, 4), [5, 4])
    })

    it('It should return an array with two values when they differ 2/3', function () {
      assert.deepEqual(differ.compareValues('foo', 'bar'), ['foo', 'bar'])
    })

    it('It should return an array with two values when they differ 3/3', function () {
      assert.deepEqual(differ.compareValues(true, false), [true, false])
    })

    it('It should return null when two functions are equal', function(){
      assert.deepEqual(differ.compareFunctions(()=>10,()=>10), null)
    })

    it('It should return an array with two functions when they differ', function(){
      assert.deepEqual(differ.compareFunctions(()=>10,()=>20), [
        '()=>10', '()=>20'
      ])
    })
  })

  describe('Simple object comparison', function(){
    it('It should return null when two numbers are equal', function(){
      const obj1 = { a: 3}
      const obj2 = { a: 3}
      assert.deepEqual(differ.getDiffs( obj1, obj2), null)
    })
    
    it('It should return { key: [number1, number2]} when two numbers differ', function () {
      const obj1 = { a: 3 }
      const obj2 = { a: 2 }
      assert.deepEqual(differ.getDiffs(obj1, obj2), {a: [3, 2]})
    })

    it('It should return null when two strings are equal', function () {
      const obj1 = { a: 'foo' }
      const obj2 = { a: 'foo' }
      assert.deepEqual(differ.getDiffs(obj1, obj2), null)
    })

    it('It should return { key: [string1, string2]} when two strings differ', function () {
      const obj1 = { a: 'foo' }
      const obj2 = { a: 'bar' }
      assert.deepEqual(differ.getDiffs(obj1, obj2), { a: ['foo', 'bar'] })
    })

    it('It should return null when two booleans are equal', function () {
      const obj1 = { a: true }
      const obj2 = { a: true }
      assert.deepEqual(differ.getDiffs(obj1, obj2), null)
    })

    it('It should return { key: [bool1, bool2]} when two booleans differ', function () {
      const obj1 = { a: true }
      const obj2 = { a: false }
      assert.deepEqual(differ.getDiffs(obj1, obj2), { a: [true, false] })
    })

    it('It should return null when two functions are equal', function () {
      const obj1 = { a: () => 10 }
      const obj2 = { a: () => 10 }
      assert.deepEqual(differ.getDiffs(obj1, obj2), null)
    })

    it('It should return { key: [func1.toString(), func2.toString()]} when two functions differ', function () {
      const obj1 = { a: () => 10 }
      const obj2 = { a: function( k ){ return k * 2}}
      assert.deepEqual(differ.getDiffs(obj1, obj2), { a: [obj1.a.toString(), obj2.a.toString()] })
    })

    it('It should return {difference: "types differ", type1..., value1..., type2..., value2...} when types doesn´t coincide', function(){
      const obj1 = { a: 'foo' }
      const obj2 = { a: 2 }
      assert.deepEqual(differ.getDiffs(obj1, obj2), {a: {
        difference: 'Types differ', type1: 'string', value1: 'foo', type2: 'number', value2: 2}})
    })

    it('It should return {difference: "key missed in first object", value2: value2} when the key is not present in first object', function(){
      const obj1 = {a: 3}
      const obj2 = {a: 3, b: 6}
      assert.deepEqual(differ.getDiffs(obj1, obj2), { b: { difference: 'Key miss in first object', value2: 6}})
    })

    it('It should return {difference: "key missed in second object", value1: value1} when the key is not present in second object', function(){
      const obj1 = {a: 3, b: 6}
      const obj2 = {a: 3}
      assert.deepEqual(differ.getDiffs(obj1, obj2), { b: { difference: 'Key miss in second object', value1: 6}})
    })
  })

  describe('Array comparison', function () {
    it('It should return null when two arrays are equal', function () {
      const obj1 = { a: [2, 4, 5, 7, 8, 9] }
      const obj2 = { a: [2, 4, 5, 7, 8, 9] }
      assert.deepEqual(differ.getDiffs(obj1, obj2), null)
    })

    it('It should return {key: {index: [valInArray1, valInArray2]}} when two arrays differ', function () {
      const obj1 = { a: [2, 4, 5, 7, 3, 9] }
      const obj2 = { a: [2, 4, 5, 7, 8, 9] }
      assert.deepEqual(differ.getDiffs(obj1, obj2), { a: { '4': [3, 8] } })
    })

    it('It should compare different types inside an array 1/2', function(){
      const obj1 = { a: [2, 4, 5, 7, 3, 9] }
      const obj2 = { a: [2, 'four', 5, 7, 3, 9] }
      const expectedOutput = {
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
      assert.deepEqual(differ.getDiffs(obj1, obj2), expectedOutput)
    })

    it('It should compare different types inside an array 2/2', function () {
      const obj1 = { a: [2, 4, 5, 7, 3, 9] }
      const obj2 = { a: [2, [3,4,5], 5, 7, 3, 9] }
      const expectedOutput = {
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
      assert.deepEqual(differ.getDiffs(obj1, obj2), expectedOutput)
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

      const expectedOuput = {
        values: { special: [10, 9]}
      }

      assert.deepEqual(differ.getDiffs(obj1, obj2), expectedOuput)
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

      const expectedOuput = {
        title: ['foo', 'bar'],
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

      assert.deepEqual(differ.getDiffs(obj1, obj2), expectedOuput)
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

      const expectedOuput = {
        title: ['foo', 'bar'],
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
        checked: [true, false],
        near: {
          difference: 'Key miss in first object',
          value2: 'yes'
        },
        far: {
          difference: 'Key miss in second object',
          value1: [3, 4, 8]
        }
      }

      assert.deepEqual(differ.getDiffs(obj1, obj2), expectedOuput)
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