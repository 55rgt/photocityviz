const _ = require('lodash');

let arr = {
  1: 1718,
  2: 810,
  3: 1255,
  4: 1021,
  5: 5969,
  6: 489,
  7: 1374,
  8: 829,
  9: 1375,
  10: 520,
  11: 794,
  12: 1138
};

let sum = 17292;
let width = 292;
let newObj = {};
_.forEach(Object.keys(arr), (key) => {
  newObj[key] = width * arr[key] / sum;
});
console.log(newObj);

let newArr = _.reduce(Object.keys(newObj), (result, datum) => {
  result.arr.push({
    "cluster": datum,
    "width": newObj[datum],
    "x": result.sum
  });
  result.sum += newObj[datum];
  return result;

}, {
  arr: [],
  sum: 0
});


console.log(newObj);
console.log(newArr);
/*
[
{"cluster": 1, width: 3, x: 4]
]

 */
console.log(sum);
