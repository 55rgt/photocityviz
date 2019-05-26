const _ = require('lodash');


let a = ["2018-12-13 23.34.15 1933503354475178473_Taiwan.jpg","2018-12-13 23.34.15 1933503354475178473_Korea.jpg",  "2018-12-13 23.34.15 1933503354475178473_Japan.jpg", "2018-12-13 23.34.15 1933503354475178473_Japan.jpg", "2018-12-13 23.34.15 1933503354475178473_Taiwan.jpg"];

let cob = {};
_.forEach(a, name => {
  let country = name.match(/_(.+)[.]jpg/)[1];
  _.isNil(cob[country]) ? cob[country] = 1 : cob[country] += 1;
});

let co = _.chain(cob).toPairs().sortBy(1).reverse().value();
console.log(co);
let maxValue_co = 0;
let maxCountries = _.reduce(co, (result, datum) => {
  if (maxValue_co < datum[1]) maxValue_co = datum[1];
  if (datum[1] === maxValue_co) result.push(datum[0]);
  return result;
}, []);
console.log(maxCountries);
