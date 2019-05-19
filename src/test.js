const _ = require('lodash');

function greet() {
  console.log('hello')
}

const debouncedFunction = _.debounce(greet, 10000);

debouncedFunction();
