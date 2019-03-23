<template lang="pug">
  //.chart
  //  div
  .test
    v-expansion-panel(v-model='panel' expand)
      v-expansion-panel-content
        template(v-slot:header='')
          div Hello
        .sth
          | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
          .tea dlkfjd
      v-expansion-panel-content
        template(v-slot:header='')
          div Item
        .sth
          | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
</template>

<script>
/* eslint-disable no-console */

import * as d3 from 'd3';

export default {
  name: 'FilterComponent',
  data() {
    return {
      data: [3, 5, 12, 13, 24, 35],
      svg: null,
      panel: [false, true, true]
    };
  },
  mounted() {
    let that = this;
    let x = d3.scaleLinear()
        .domain([0, d3.max(that.data)])
        .range([0, 420]);
    d3.select('.chart')
        .selectAll('div')
        .data(that.data)
        .enter().append('div')
        .style('width', d => x(d) + 'px')
        .text(d => d);
  },
  watch: {
    panel: function() {
      let that = this;
      console.log(that.panel);
    }
  },
  methods: {}

};
</script>

<style scoped lang="sass">

.test
  width: 100%
  height: auto

.chart
  width: 100%
  height: 100%
  /deep/ div
    font: 10px sans-serif
    background-color: steelblue
    text-align: right
    padding: 3px
    margin: 1px
    color: white


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
