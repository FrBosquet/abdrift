const getEveryKeyIn = ( obj1, obj2 ) => {
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)
  const mergedKeys = [...obj1Keys, ...obj2Keys]
  return mergedKeys.reduce((keys, value) => {
    return keys.indexOf(value) === -1 ?
      [...keys, value] :
      keys
  }, []).sort()
}

const createFirstValueMissedMessage = (valueIn2) => ({
  difference: 'Key miss in first object',
  value2: valueIn2
})

const createSecondValueMissedMessage = (valueIn1) => ({
  difference: 'Key miss in second object',
  value1: valueIn1
})

const createTypesDifferMessage = (type1, value1, type2, value2) => ({
  difference: 'Types differ',
  type1, value1, type2, value2
})

const compare = (type, value1, value2) => {
  switch (type) {
    case 'number':
    case 'string':
    case 'boolean': return compareValues(value1, value2)
    case 'function': return compareFunctions( value1, value2 )
    case 'object': return getDiffs(value1, value2)
  }
  return null
}

const compareValues = (val1, val2) => val1 !== val2 ? {
  difference: 'The values differ',
  value1: val1,
  value2: val2
} : null

const compareFunctions = (func1, func2) => 
  func1.toString() !== func2.toString() ? {
    difference: 'The functions differ',
    func1: func1.toString(),
    func2: func2.toString()
  } : null

const getDiffs = ( obj1, obj2 ) => {
  const everyKey = getEveryKeyIn( obj1, obj2)
  const diffObj = {}
  everyKey.forEach( key =>{
    const valueIn1 = obj1[key]
    const valueIn2 = obj2[key]
    const typeIn1 = typeof valueIn1
    const typeIn2 = typeof valueIn2

    if(valueIn1 === undefined){
      diffObj[key] = createFirstValueMissedMessage(valueIn2)
    } else if (valueIn2 === undefined) {
      diffObj[key] = createSecondValueMissedMessage(valueIn1)
    }else if( typeIn1 === typeIn2 ){
      const difference = compare( typeIn1, valueIn1, valueIn2)
      if(difference) diffObj[key] = difference
    }else{
      diffObj[key] = createTypesDifferMessage(typeIn1, valueIn1, typeIn2, valueIn2)
    }
  })
  return Object.keys(diffObj).length !== 0 ? diffObj : null
}

const isEqual = (obj1, obj2) => {
  const differences = getDiffs(obj1, obj2)
  return differences === null
}

module.exports = {
  getEveryKeyIn,
  createFirstValueMissedMessage,
  createSecondValueMissedMessage,
  createTypesDifferMessage,
  compare,
  compareValues,
  compareFunctions,
  getDiffs,
  isEqual
}