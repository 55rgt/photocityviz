const _ = require('lodash');


let map = {
      'hexRadius': 60,
      'cohesion': 12,
      'countries': ['Japan'],
      'start': 1,
      'end': 12
    };
let a = map;
let b = {...map};
let c = JSON.parse(JSON.stringify(map));

map.hexRadius = 'z';
map.countries.push('Korea');
console.log(a);
console.log(b);
console.log(c);
