'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var everyKeyIn = function everyKeyIn(obj1, obj2) {
  return [].concat(_toConsumableArray(Object.keys(obj1)), _toConsumableArray(Object.keys(obj2))).reduce(function (keys, value) {
    return keys.indexOf(value) === -1 ? [].concat(_toConsumableArray(keys), [value]) : keys;
  }, []).sort();
};

var firstKeyMissed = function firstKeyMissed(value2) {
  return {
    difference: 'Key not in first object',
    value2: value2
  };
};

var secondKeyMissed = function secondKeyMissed(value1) {
  return {
    difference: 'Key not in second object',
    value1: value1
  };
};

var typesDiffer = function typesDiffer(type1, value1, type2, value2) {
  return {
    difference: 'Types differ',
    type1: type1, value1: value1, type2: type2, value2: value2
  };
};

var compare = function compare(type, value1, value2) {
  switch (type) {
    case 'number':
    case 'string':
    case 'boolean':
      return compareValues(value1, value2);
    case 'function':
      return compareFunctions(value1, value2);
    case 'object':
      return getDiffs(value1, value2);
  }
  return null;
};

var compareValues = function compareValues(value1, value2) {
  return value1 !== value2 ? {
    difference: 'Values differ',
    value1: value1,
    value2: value2
  } : null;
};

var compareFunctions = function compareFunctions(func1, func2) {
  return func1.toString() !== func2.toString() ? {
    difference: 'Functions differ',
    func1: func1.toString(),
    func2: func2.toString()
  } : null;
};

var getDiffs = function getDiffs(obj1, obj2) {
  var diffObj = {};
  everyKeyIn(obj1, obj2).forEach(function (key) {
    var value1 = obj1[key];
    var value2 = obj2[key];
    var type1 = typeof value1 === 'undefined' ? 'undefined' : _typeof(value1);
    var type2 = typeof value2 === 'undefined' ? 'undefined' : _typeof(value2);
    if (value1 === undefined) {
      diffObj[key] = firstKeyMissed(value2);
    } else if (value2 === undefined) {
      diffObj[key] = secondKeyMissed(value1);
    } else if (type1 === type2) {
      var difference = compare(type1, value1, value2);
      if (difference) diffObj[key] = difference;
    } else {
      diffObj[key] = typesDiffer(type1, value1, type2, value2);
    }
  });
  return Object.keys(diffObj).length !== 0 ? diffObj : null;
};

var isEqual = function isEqual(obj1, obj2) {
  return getDiffs(obj1, obj2) === null;
};

module.exports = {
  everyKeyIn: everyKeyIn,
  firstKeyMissed: firstKeyMissed,
  secondKeyMissed: secondKeyMissed,
  typesDiffer: typesDiffer,
  compare: compare,
  compareValues: compareValues,
  compareFunctions: compareFunctions,
  isEqual: isEqual,
  getDiffs: getDiffs
};