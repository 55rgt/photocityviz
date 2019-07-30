const _ = require('lodash');

let data = [
  { x: 10, y: 10 },
  { x: 10, y: 10 },
  { x: 20, y: 20 },
  { x: 30, y: 30 },
  { x: 40, y: 40 }
];
for (let i = 0; i < data.length; i++) {
  let lt = data[i];
  console.log(i, data);
  for (let j = i + 1; j < data.length; j++) {
    let rb = data[j];
    if(j === 2) {
      rb.x = 234;
      rb.y = 234
    }
  }
}
let count = 4 ;

while(count > 0){
  console.log('a');
  count = Math.floor(Math.random() * 6);
  console.log(count);
}
function checkCollsion(lt, rb) {
  const d = Math.sqrt(Math.pow(lt.x - rb.x, 2) + Math.pow(lt.y - rb.y, 2));
  if (d >= lt.radius + rb.radius) {
    return 0;
  } else {
    if (lt.x === rb.x && lt.y === rb.y) {
      let newX = (Math.random() * 2 - 1) * (lt.radius + rb.radius) + lt.x;
      let mark = Math.floor(Math.random() * 10 + 1) % 2 === 0 ? 1 : -1;
      let newY = Math.floor(mark * Math.sqrt(Math.pow(lt.radius + rb.radius, 2) - Math.pow(newX - lt.x, 2)) + lt.y);
      rb.x = Math.floor(newX);
      rb.y = newY;
    } else {
      let newX = (lt.radius + rb.radius) * (rb.x - lt.x) / d + lt.x;
      let newY = Math.floor((rb.y - lt.y) / (rb.x - lt.x) * (newX - rb.x) + rb.y);
      rb.x = Math.floor(newX);
      rb.y = newY;
    }
    return 1;
  }
}

//
// if (d
// } < bigR + smallR) {
//   // 2 점 만남
//
//   let newX = (lt.radius + rb.radius) * (rb.x - lt.x) / d + lt.x;
//   let newY = (rb.y - lt.y) / (rb.x - lt.x) * (newX - rb.x) + rb.y;
//
// } else if (d === bigR - smallR) {
//   // 내접
// } else {
//   // 한 원이 다른 원 내부
//
//   // 여기에서 temp 조건
//
// }
