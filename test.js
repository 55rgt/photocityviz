const _ = require('lodash');
let a = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
console.log(a.slice(0, 8));  // 0번째 인덱스부터 7까지 [ '1', '2', '3', '4', '5', '6', '7', '8' ]
console.log(a.slice(3, 8)); // [ '4', '5', '6', '7', '8' ]

_.map(a, (d, i) => {
  console.log(d, i);
});


let users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred', 'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1, 'active': true }
];

console.log(_.find(users, function (o) {
  return o.age < 40;
}));
