<template lang="pug">
  .test-svg#chart
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'SpiralComponent',
  data() {
    return {
      color: null,
      width: 372,
      height: 432,
      start: 0,
      end: 2.25,
      numSpirals: 4,
      yScale: null,
      r: null,
      path: null,
      radius: null,
      theta: null,
      spiral: null,
      spiralLength: null,
      N: 365,
      barWidth: null,
      someData: [],
      timeScale: null,
      margin: { top: 30, right: 30, bottom: 30, left: 30 },
      svg: null,
      points: null,
    }
  },
  mounted() {
    let that = this;
    // 색상 지정
    that.color = d3.scaleOrdinal(d3.schemeCategory10);
    // 점 개수 지정?
    that.points = d3.range(that.start, that.end + 0.001, (that.end - that.start) / 1000);
    // 세타값
    that.theta = r => that.numSpirals * Math.PI * r;

    that.r = d3.min([that.width, that.height]) / 2 - 40;
    // x: [0, 2.25] y: [40, 210] y = (170/2.25)x + 40
    that.radius = d3.scaleLinear()
        .domain([that.start, that.end])
        .range([40, that.r]);
    // 그림판 붙이기
    that.svg = d3.select('#chart')
        .append('svg')
        .attr('width', that.width + that.margin.right + that.margin.left)
        .attr('height', that.height + that.margin.top + that.margin.bottom)
        .append('g')
    // 사각형 붙이기
    that.svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%");

    // 손 안 대도 됨
    that.spiral = d3.lineRadial()
        .curve(d3.curveCardinal)
        .angle(that.theta)
        .radius(that.radius);

    // 손 안 대도 됨
    that.path = that.svg.append("path")
        .datum(that.points)
        .attr("id", "spiral")
        .attr("d", that.spiral)
        .style("fill", "none")
        .style("stroke", "dodgerblue");

    that.spiralLength = that.path.node().getTotalLength();

    // 바 너비
    that.barWidth = (that.spiralLength / that.N);

    // 데이터 부분은 나중에 mongoDB에서 받아오는 걸로 한다.
    for (let i = 0; i < that.N; i++) {
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);
      that.someData.push({
        date: currentDate,
        value: Math.random() + 0.3,
        // 그룹으로 색상을 지정하는 것 같다.
        // group: Math.floor(Math.random()*16777215).toString(16)
        group: currentDate.getMonth()
      });
    }

    that.timeScale = d3.scaleTime()
        .domain(d3.extent(that.someData, d => d.date))
        .range([0, that.spiralLength]);

    // y값 지
    that.yScale = d3.scaleLinear()
        .domain([0, d3.max(that.someData, d => d.value)])
        .range([0, (that.r / that.numSpirals) - 20]);

    that.svg.selectAll("rect")
        .data(that.someData)
        .enter()
        .append("rect")
        .attr("x", d => {
          let linePer = that.timeScale(d.date),
              posOnLine = that.path.node().getPointAtLength(linePer),
              angleOnLine = that.path.node().getPointAtLength(linePer - that.barWidth);
          d.linePer = linePer; // % distance are on the spiral
          d.x = posOnLine.x; // x postion on the spiral
          d.y = posOnLine.y; // y position on the spiral
          d.a = (Math.atan2(angleOnLine.y, angleOnLine.x) * 180 / Math.PI) - 90; //angle at the spiral position
          return d.x;
        })
        .attr("y", d => d.y)
        .attr("width", () => that.barWidth)
        .attr("height", d => that.yScale(d.value))
        .style("fill", d => that.color(d.group))
        .style("stroke", "none")
        .attr("transform", d => "rotate(" + d.a + "," + d.x  + "," + d.y + ")")

  }

};
</script>

<style scoped lang="sass">

.test-svg
  width: calc(100% / 3)
  height: 492px
  border: 1px solid black



</style>
