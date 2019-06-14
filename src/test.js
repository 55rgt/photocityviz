const _ = require('lodash');

let data = [{'T': '1'},{'A': 2},{'V': 4},{'T': 3}];
console.log(data.length);
data['cluster'] = 6;
console.log(data.length);
_.forEach(data, d => console.log(d));
