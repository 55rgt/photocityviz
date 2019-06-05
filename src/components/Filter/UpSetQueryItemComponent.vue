<template lang="pug">
  .upset-query-item-container
    .upset-query-item(@click="toggleQueryItem(labelDatum.key)" v-bind:class="{ selectedQueryItem: queryState !== 0 }")
      .upset-query-chart-container(v-bind:id="'Query_'+ labelDatum.key.replace(' ', '')")
      .upset-query-button-container(v-bind:class="{ selectedQueryButton: queryState !== 0 }")
</template>

<script>
import * as d3 from 'd3';

const QUERY_STATE = ['unselected', 'maybe', 'must', 'not'];

export default {
  name: 'UpSetQueryItemComponent',
  props: {
    labelDatum: Object
  },
  data() {
    return {
      width: 53,
      height: 25,
      maxCount: 5000,
      length: null,
      queryState: 0,
    };
  },
  mounted() {
    let that = this;
    that.length = (that.labelDatum.value / that.maxCount) * that.width + 1;
   that.render();
  },
  methods: {
    async toggleQueryItem(key) {
      let that = this;
      that.queryState = (that.queryState + 1) % QUERY_STATE.length;
      await that.$store.dispatch('updateLabelQuery', { key, value: QUERY_STATE[that.queryState] });
      // 버튼 업데이트
    },
    render() {
      let that = this;
      that.svg = d3.select(`#Query_${that.labelDatum.key.replace(' ', '')}`)
          .append('svg')
          .attr('width', that.width)
          .attr('height', that.height)
          .style('background-color', '#f0f0f0');

      that.svg.append('rect')
          .attr('x', that.width - that.length)
          .attr('y', 0)
          .attr('width', that.length)
          .attr('height', that.height)
          .attr('fill', that.queryState === 0 ? '#636363' : '#d3d3d3');

      that.svg.append('text')
          .attr('x', 2)
          .attr('y', 8)
          .text(that.labelDatum.key.replace('Transportation', 'Trans.'))
          .style('font-size', '7px')
          .style('font-family', 'Roboto, sans-serif')
          .style('fill', '#312415');

      // data를 array식으로 해서 watch=> prop => data 변형 식으로

    }
  }
};
</script>

<style scoped lang="sass">
@import url('https://fonts.googleapis.com/css?family=Roboto')
@import "../../style/styles"
.upset-query-item-container
  width: $upset-query-item-container-width
  height: $upset-query-item-container-height
  padding: $unit-1
  .upset-query-item
    width: 100%
    height: 100%
    box-sizing: initial
    border: 2px solid #dcdcdc
    @include selectNone
    cursor: pointer
    transition: background 0.15s ease-in-out
    display: flex
    &:hover
      background: rgba(0, 0, 0, 0.1) !important
    .upset-query-chart-container
      width: $upset-query-chart-container-width
      height: 100%
    .upset-query-button-container
      width: $upset-query-button-container-width
      height: 100%
      border-left: 2px solid #dcdcdc
.selectedQueryItem
  box-sizing: initial
  border: 2px solid #646464 !important
.selectedQueryButton
  box-sizing: initial
  border-left: 2px solid #646464 !important

</style>
