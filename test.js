const _ = require('lodash');


const data = ["apple", "banana", "apple", "orange", "grapes", "mango", "banana"];

const result = _.values(_.groupBy(data)).map(d => ({name: d[0], value: d.length}));

const r = _.chain(data)
    .groupBy()
    .map(d => ({name: d[0], value: d.length}))
    .value();
// console.log(r);


let d = [

  {
    group: 1,
    name: 'Tom',
    value: ['a','b']
  },
  {
    group: 2,
    name: 'Mike',
    value: ['a','b']
  },
  {
    group: 1,
    name: 'Chester',
    value: ['a','b']
  },
  {
    group: 3,
    name: 'York',
    value: ['a','b']
  },
  {
    group: 2,
    name: 'Shinoda',
    value: ['a','b', 'c']
  },
  {
    group: 1,
    name: 'Liberty',
    value: ['a']
  }
];
// console.log(_.groupBy(d, e => e.group));

let a = _.chain(d)
    .groupBy(e => e.group)
    // .map(e => e.value)
    .value();
// console.log(a);

// _.map(a, (k,v) => console.log(k,v));

console.log(_.map(a, (k, v) => ({
  name: v,
  children: _.chain(_.map(k, ele => ele.value))
      .groupBy()
      .map(d => ({name: d[0], value: d.length}))
      .value()
})));


