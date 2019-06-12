const _ = require('lodash');

let data = { 0: [[], [], [], [], []], cluster: 1 };
console.log(data.length);

let objects = [[{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }], [{ 'n': 1 }, { 'n': 2 }, { 'n': 3 }, { 'n': 4 }],
  [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 66 }], [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }]];

let a = objects.sort((a,b) => _.sumBy(b, e => e.n) - _.sumBy(a, e => e.n));
console.log(a);
