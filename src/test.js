/* eslint-disable */
const fs = require('fs');
const { promisify } = require('util');
const _ = require('lodash');

let testData =
    [
      {
        'Group': 'A',
        'Hour': 1
      },
      {
        'Group': 'A',
        'Hour': 2
      },
      {
        'Group': 'B',
        'Hour': 2
      },
      {
        'Group': 'B',
        'Hour': 3
      },
      {
        'Group': 'B',
        'Hour': 2
      },
      {
        'Group': 'C',
        'Hour': 3
      },
      {
        'Group': 'C',
        'Hour': 2
      },
    ];

const pReadFile = promisify(fs.readFile);
(async () => {
  const file = '../public/data/Total_refined_short.json';
  const refinedJSON = JSON.parse(await pReadFile(file));

  let result = _.reduce(refinedJSON, function (result, value) {
    const hour = value["Hour"];
    if(_.isNil(_.find(result, ['Hour', hour]))) result.push({
      Hour: hour,
      [value.Group]: 1
    });
    else {
      _.isNil(result[_.findIndex(result, d => d.Hour === hour)][value.Group]) ?
          result[_.findIndex(result, d => d.Hour === hour)][value.Group] = 1
          : result[_.findIndex(result, d => d.Hour === hour)][value.Group]+= 1;
    }
    return result;
  }, []);
  console.log(result);

})().catch(error => console.log(error));

