<template lang="pug">
  .test#my_dataviz

</template>

<script>
/* eslint-disable no-console */

import * as d3 from 'd3';
import _ from 'lodash';
import example from '../../public/data/example';

export default {
  name: 'FilterComponent',
  data() {
    return {
      length: 3,
      width: 840,
      height: 594,
      data: example,
      format: null,
      color: null
    };
  },
  mounted() {
    // set the dimensions and margins of the graph
var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = this.width - 20,
    height = this.height - 20;
var colorScheme = ["#E57373","#BA68C8","#7986CB","#A1887F","#90A4AE","#AED581"];
var color = d3.scaleOrdinal()
    .domain(['group1','group2','group3','group4','group5','group6'])
    .range(colorScheme);


// append the svg object to the body of the page
var svg = d3.select('#my_dataviz')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')');
var data = this.data;
var root = d3.hierarchy(data).sum(function (d) {
  return d.value;
}); // Here the size of each leave is given in the 'value' field in input data
// Then d3.treemap computes the position of each element of the hierarchy
d3.treemap()
    .data([width, height])
    .padding(1.5)(root);

// use this information to add rectangles:
svg
    .selectAll('rect')
    .data(root.leaves())
    .enter()
    .append('rect')
    .attr('x', function (d) {
      return d.x0;
    })
    .attr('y', function (d) {
      return d.y0;
    })
    .attr('width', function (d) {
      return d.x1 - d.x0;
    })
    .attr('height', function (d) {
      return d.y1 - d.y0;
    })
    .style('stroke', 'black')
    .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
    .attr("fill-opacity", 0.6);

// and to add the text labels
svg
    .selectAll('text')
    .data(root.leaves())
    .enter()
    .append('text')
    .attr('x', function (d) {
      return d.x0 + 5;
    })    // +10 to adjust position (more right)
    .attr('y', function (d) {
      return d.y0 + 20;
    })    // +20 to adjust position (lower)
    .text(function (d) {
      return d.data.name;
    })
    .attr('font-size', '15px')
    .attr('fill', 'white');
  },
  watch: {},
  methods: {
    random() {
      return Math.floor(Math.random() * 950)
    }
  }

};
</script>

<style scoped lang="sass">

.test
  width: 100%
  height: auto


</style>

<!--/*-->
<!--세 개를 만들어야 함.-->
<!--A. 메인 몸통 1개 B. 양 끝 귀 2-->
<!--1. 마우스를 pressed 했을 때 세 가지 경우가 있다. (눌러진 좌표 위치에 따라)-->
<!--1) 기존 영역 안-->
<!--=> 이미 존재하고 있는 rect의 위치가 mouse가 눌리면서 드래그되는 위치에 따라 달라진다.-->
<!--=> Min Max realm 영억 처리 필요-->
<!--2) 기존 영역 밖-->
<!--=> 이미 존재하고 있는 rect가 있다면 (없다면 무시) 지우고 새로운 rect를 생성한다.-->
<!--3) 영역의 양 끝 귀-->
<!--=> 귀 어디 쪽을 누르고 움직이느냐에 따라서 달라지겠지만, 기본적으로 메인 몸통의 크기를 바꾸는 것에 주력-->

<!--y좌표는 상관 없음 무조건 x좌표로 고정하고 메인 몸통의 영역은 x만 변하는 식으로 해야 함-->

<!--마우스가 눌러진 상태로 움직였을 때 계속해서 이벤트를 trigger해야 하는데,-->
<!--데이터가 많아져서 그게 무거워진다면, debounce를 이용하여 drag가 된 상태에서 0.n초 이내에 아무런 이벤트가 없었다면-->
<!--trigger하는 식으로 하면 된다.-->

<!--*/-->
<!--// .on({-->
<!--//   "mouseover": () => console.log("mouseover"),-->
<!--//   "mouseout": () => console.log("mouseout"),-->
<!--//   "click": () => console.log("click"),-->
<!--// })-->
