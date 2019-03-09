<template lang="pug">
  .wrapper
    .test-svg#chart
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'MainPage',
  data() {
    return {
      color: null,
      width: 500,
      height: 500,
      start: 0,
      end: 2.25,
      numSpirals: 3,
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
    that.color = d3.scaleOrdinal(d3.schemeCategory10);
    that.points = d3.range(that.start, that.end + 0.001, (that.end - that.start) / 1000);
    that.theta = r => that.numSpirals * Math.PI * r;
    that.r = d3.min([that.width, that.height]) / 2 - 40;
    that.radius = d3.scaleLinear()
        .domain([that.start, that.end])
        .range([40, that.r]);
    that.svg = d3.select('#chart')
        .append('svg')
        .attr('width', that.width + that.margin.right + that.margin.left)
        .attr('height', that.height + that.margin.top + that.margin.bottom)
        .append('g')
        .attr("transform", "translate(" + that.width / 2 + "," + that.height / 2 + ")");
    that.svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "silver");
    that.spiral = d3.radialLine()
        .curve(d3.curveCardinal)
        .angle(that.theta)
        .radius(that.radius);
    that.path = that.svg.append("path")
        .datum(that.points)
        .attr("id", "spiral")
        .attr("d", that.spiral)
        .style("fill", "none")
        .style("stroke", "steelblue");
    that.spiralLength = that.path.node().getTotalLength();
    that.barWidth = (that.spiralLength / that.N) - 1;
    for (let i = 0; i < that.N; i++) {
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);
      that.someData.push({
        date: currentDate,
        value: Math.random(),
        group: currentDate.getMonth()
      });
    }
    that.timeScale = d3.scaleTime()
        .domain(d3.extent(that.someData, d => d.date))
        .range([0, that.spiralLength]);

    that.yScale = d3.scaleLinear()
        .domain([0, d3.max(that.someData, d => d.value)])
        .range([0, (that.r / that.numSpirals) - 30]);

    that.svg.selectAll("rect")
        .data(that.someData)
        .enter()
        .append("rect")
        .attr("x", function(d,i){
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
        .attr("transform", d => "rotate(" + d.a + "," + d.x  + "," + d.y + ")");
  }

};
</script>

<style scoped lang="sass">

.wrapper
  width: 1920px
  height: 1080px



</style>
