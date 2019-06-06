const _ = require('lodash');

let data = [
  {
    'clusterGroup': 0,
    'country': 'Taiwan',
    'labels': ['Dish', 'Food'],
    'month': 2,
    'name': 'afd',
    'x': 45,
    'y': 45
  },
  {
    'clusterGroup': 2,
    'country': 'Taiwan',
    'labels': ['Dish', 'Food'],
    'month': 4,
    'name': 'afd',
    'x': 45,
    'y': 45
  },
  {
    'clusterGroup': 8,
    'country': 'Taiwan',
    'labels': ['Dish', 'Food'],
    'month': 7,
    'name': 'afd',
    'x': 45,
    'y': 45
  },
  {
    'clusterGroup': 10,
    'country': 'Taiwan',
    'labels': ['Dish', 'Food'],
    'month': 9,
    'name': 'afd',
    'x': 45,
    'y': 45
  },
];

let newData = _.map(data, datum => {
  datum.month % 2 === 0 ? datum.selected = 'true' : datum.selected = 'false';
  return datum;
});

// console.log(newData);


let labels = ['a', 'b', 'c'];
// console.log(a.includes('r'));

let must1 = ['a', 'b'];
let must2 = ['a', 'd'];
let must3 = ['a', 'b', 'c', 'd'];
let must4 = ['a', 'c', 'd', 'f'];

let not1 = ['a', 'b'];
let not2 = ['a', 'd'];
let not3 = ['a', 'b', 'c', 'd'];
let not4 = ['e', 'h', 'd', 'f'];
let not5 = ['e', 'h'];


console.log(_.intersection(not5, labels));


let test = {
  'tom': 'null',
  'gom': 'maybe',
  'qom': 'must',
  'wom': 'not',
  'eom': 'not',
  'yom': 'maybe',
  'iom': 'not',
};

// let ad = _.filter(test, (value, key) => {
//       if(value === 'not') return value;
// });
// console.log(ad);
//
// let labelList = _.reduce(test, (result, value, key) => {
//       if(value === 'not') result['not'].push(key);
//       if(value === 'must') result['must'].push(key);
//       return result;
// }, {'must': [], 'not': []});
// console.log(labelList);
