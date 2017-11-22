everyKeyIn = ( obj1, obj2 ) => {
  return [...Object.keys(obj1), ...Object.keys(obj2)]
    .reduce((keys, value) => 
     keys.indexOf(value) === -1 ?
        [...keys, value] :
        keys
    , [])
    .sort()
}

firstKeyMissed = value2 => ({
  difference: 'Key not in first object',
  value2
})

secondKeyMissed = value1 => ({
  difference: 'Key not in second object',
  value1
})

typesDiffer = (type1, value1, type2, value2) => ({
  difference: 'Types differ',
  type1, value1, type2, value2
})

compare = (type, value1, value2) => {
  switch (type) {
    case 'number':
    case 'string':
    case 'boolean': return compareValues(value1, value2)
    case 'function': return compareFunctions( value1, value2 )
    case 'object': return getDiffs(value1, value2)
  }
  return null
}

compareValues = (value1, value2) =>
  value1 !== value2 ? 
  ({
    difference: 'Values differ',
    value1,
    value2
  }) :
  null


compareFunctions = (func1, func2) => 
  func1.toString() !== func2.toString() ? {
    difference: 'Functions differ',
    func1: func1.toString(),
    func2: func2.toString()
  } : null

getDiffs = ( obj1, obj2 ) => {
  const diffObj = {}
  everyKeyIn(obj1, obj2).forEach( key =>{
    const value1 = obj1[key]
    const value2 = obj2[key]
    const type1 = typeof value1
    const type2 = typeof value2
    if(value1 === undefined){
      diffObj[key] = firstKeyMissed(value2)
    } else if (value2 === undefined) {
      diffObj[key] = secondKeyMissed(value1)
    }else if( type1 === type2 ){
      const difference = compare( type1, value1, value2)
      if(difference) diffObj[key] = difference
    }else{
      diffObj[key] = typesDiffer(type1, value1, type2, value2)
    }
  })
  return Object.keys(diffObj).length !== 0 ? diffObj : null
}

isEqual = (obj1, obj2) => getDiffs(obj1, obj2) === null

module.exports = {
  everyKeyIn,
  firstKeyMissed,
  secondKeyMissed,
  typesDiffer,
  compare,
  compareValues,
  compareFunctions,
  getDiffs,
  isEqual
}