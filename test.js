const _ = require('lodash');

function getKeyByValue(object, value) {
  return _.filter(Object.keys(object), key => object[key] === value);
}


const map = {"first" : "null", "second" : "must",
  "third" : "must", "fourth" : "must",
  "fifth" : "not", "sixth" : "not",
  "seventh" : "null", "eighth" : "maybe"};
console.log(getKeyByValue(map,"null"));

