let dtStart = '2018-03-01';
let dtEnd = '2019-02-28';
let test = ['2017-05-30', '2018-05-30', '2019-02-28'];
let getTime = str => new Date(str).getTime() / 1000;

for(let t of test) {
  console.log(
      (getTime(dtStart) - getTime(t)) *
      (getTime(dtEnd) - getTime(t)) <= 0)
}

