<!--<template lang="pug">-->
<!--  .hexMap-container(@click="test")-->
<!--</template>-->

<!--<script>-->
<!--import * as d3 from 'd3';-->
<!--import * as d3_hexbin from 'd3-hexbin';-->
<!--import data from '../../../public/data/HexMapTest';-->

<!--const RADIUS = 30;-->

<!--export default {-->
<!--  name: 'HexMap',-->
<!--  data() {-->
<!--    return {-->
<!--      size: {},-->
<!--      svg: undefined,-->
<!--      svgID: 'HexMap',-->
<!--      svgOption: {}-->
<!--    };-->
<!--  },-->
<!--  created() {-->

<!--  },-->
<!--  async mounted() {-->
<!--    let that = this;-->
<!--    that.data = data;-->
<!--    that.initialize().size();-->
<!--    that.initialize().svg();-->
<!--    that.x = d3.scaleLog()-->
<!--        .domain(d3.extent(that.data, d => d['PC1']))-->
<!--        .range([that.size.margin.left, that.size.width - that.size.margin.right]);-->
<!--    that.y = d3.scaleLog()-->
<!--        .domain(d3.extent(that.data, d => d['PC2']))-->
<!--        .rangeRound([that.size.height - that.size.margin.bottom, that.size.margin.top]);-->
<!--    that.hexbin = d3_hexbin.hexbin()-->
<!--        .x(d => that.x(d['PC1']))-->
<!--        .y(d => that.y(d['PC2']))-->
<!--        .radius(RADIUS)-->
<!--        .extent([20, 20], [that.size.width - 20, that.size.height - 20]);-->
<!--    that.bins = that.hexbin(that.data);-->
<!--    that.color = d3.scaleSequential(d3.interpolateBuPu)-->
<!--        .domain([0, d3.max(that.bins, d => d.length) / 2]);-->
<!--    that.svg.append('g')-->
<!--        .attr('stroke', '#000')-->
<!--        .attr('stroke-opacity', 0.1)-->
<!--        .selectAll('path')-->
<!--        .data(that.bins)-->
<!--        .join('path')-->
<!--        .attr('d', that.hexbin.hexagon())-->
<!--        .attr('transform', d => `translate(${d.x},${d.y})`)-->
<!--        .attr('fill', `${that.invokeColorWithinData('HexagonID')}`)-->
<!--        .attr('fill-opacity', 0.2);-->
<!--  },-->
<!--  methods: {-->
<!--    invokeColorWithinData(hexID) {-->
<!--      let that = this;-->
<!--      let uniqID = 'uniqID';-->
<!--      // 얘들은 hexID 내부 그룹들 중, 현재 선택되어 있는 그룹만 가지고 그리는 것이다.-->

<!--      // let angle = Math.PI/ 3;-->
<!--      // let [a, b, c, d, dx, dy] = [Math.cos(angle), -Math.sin(angle), Math.sin(angle), Math.cos(angle),-->
<!--      //   (RADIUS/2) * (Math.cos(angle) + Math.sin(angle)), (RADIUS/2) * (Math.cos(angle) - Math.sin(angle))];-->
<!--      // let matrix = [a, b, c, d, dx, dy];-->


<!--      // 얘는 나중에 처음에 defs를 만들어놓고 그걸 선택해서 하는 방식으로-->
<!--      let lg = that.svg.append('defs').append('radialGradient')-->
<!--      // .attr('gradientUnits', 'userSpaceOnUse')-->
<!--          .attr('id', uniqID)//id of the gradient-->
<!--          .attr('cx', '50%')-->
<!--          .attr('cy', '50%')-->
<!--          .attr('fx', '50%')-->
<!--          .attr('fy', '50%')-->
<!--          // .attr("gradientTransform", `matrix(${matrix})`);-->
<!--          .attr('gradientTransform', `rotate(${RADIUS/2}, 0.5, 0.5)`);-->

<!--      // 이거 svg tutorial 보면서 원 차트 형식으로 할 수 있을 수도 있겠다-->

<!--      // 이거를 리니어 말고 원으로 한다음에 가운데부터 비율 큰 순서대로 하는 게 더 좋을 듯!-->
<!--      // 제일 베스트는 육각형 비율대로-->

<!--      // hexID로 데이터를 참조하여 그라데이션을 돌린다.-->
<!--      // 이걸 하기 위해서는 그리기 전에 모든 클러스터에 대한 데이터가 만들어져야 함.-->
<!--      // 또한, 색상 palette가 hsb 순서 등 클러스터에 부여될 때부터 애초에 보기 좋게 돼 있어야 한다.-->
<!--      // dbscan은 outlier가 0으로 나오는 경우 있으니 주의!-->

<!--      lg.append('stop')-->
<!--          .attr('offset', '0%')-->
<!--          .style('stop-color', 'green')//end in red-->
<!--          .style('stop-opacity', 1);-->
<!--      lg.append('stop')-->
<!--          .attr('offset', '80%')-->
<!--          .style('stop-color', 'green')//end in red-->
<!--          .style('stop-opacity', 1);-->
<!--      lg.append('stop')-->
<!--          .attr('offset', '80%')-->
<!--          .style('stop-color', 'red')//end in red-->
<!--          .style('stop-opacity', 1);-->
<!--      lg.append('stop')-->
<!--          .attr('offset', '100%')-->
<!--          .style('stop-color', 'red')//end in red-->
<!--          .style('stop-opacity', 1);-->


<!--      return `url(#${uniqID})`;-->

<!--    },-->
<!--    initialize() {-->
<!--      let that = this;-->
<!--      return {-->
<!--        size: () => {-->
<!--          that.size = {-->
<!--            width: that.$el.clientWidth,-->
<!--            height: that.$el.clientHeight,-->
<!--            margin: { top: 20, bottom: 20, right: 20, left: 20 }-->
<!--          };-->
<!--        },-->
<!--        svg: () => [that.remove().svg(), that.create().svg()]-->
<!--      };-->
<!--    },-->
<!--    create() {-->
<!--      let that = this;-->
<!--      return {-->
<!--        svg: () => {-->
<!--          that.svg = d3.select(`.hexMap-container`)-->
<!--              .append('svg')-->
<!--              .attr('id', that.svgID)-->
<!--              .attr('width', that.size.width)-->
<!--              .attr('height', that.size.height);-->
<!--        }-->
<!--      };-->
<!--    },-->
<!--    remove() {-->
<!--      let that = this;-->
<!--      return {-->
<!--        svg: () => d3.select(that.svgID).remove()-->
<!--      };-->
<!--    },-->
<!--    test() {-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style scoped lang="sass">-->
<!--@import "../../style/_sizes.sass"-->
<!--@import "../../style/_colors.sass"-->
<!--.hexMap-container-->
<!--  width: 100%-->
<!--  height: 100%-->

<!--</style>-->
