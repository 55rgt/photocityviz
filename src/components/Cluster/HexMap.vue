<template lang="pug">
  .hexMap-container(@click="test")
</template>

<script>
import * as d3 from 'd3';
import * as d3_hexbin from 'd3-hexbin';
import data from '../../../public/data/HexMapTest'

export default {
  name: 'HexMap',
  data() {
    return {
      size: {},
      svg: undefined,
      svgID: 'HexMap',
      svgOption: {}
    };
  },
  created() {

  },
  async mounted() {
    let that = this;
    that.data = data;
    that.initialize().size();
    that.initialize().svg();
    that.x = d3.scaleLog()
        .domain(d3.extent(that.data, d => d.x))
        .range([that.size.margin.left, that.size.width - that.size.margin.right]);
    that.y = d3.scaleLog()
        .domain(d3.extent(that.data, d => d.y))
        .rangeRound([that.size.height - that.size.margin.bottom, that.size.margin.top]);
    that.hexbin = d3_hexbin.hexbin()
        .x(d => that.x(d.x))
        .y(d => that.y(d.y))
        .radius(12)
        .extent([20, 20], [that.size.width - 20, that.size.height - 20]);
    that.bins = that.hexbin(that.data);
    that.color = d3.scaleSequential(d3.interpolateBuPu)
        .domain([0, d3.max(that.bins, d => d.length) / 2]);
    that.svg.append("g")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.1)
        .selectAll("path")
        .data(that.bins)
        .join("path")
        .attr("d", that.hexbin.hexagon())
        .attr("transform", d => `translate(${d.x},${d.y})`)
        .attr("fill", "pink")
        .attr("fill-opacity", 0.2)
  },
  methods: {
    initialize() {
      let that = this;
      return {
        size: () => {
          that.size = {
            width: that.$el.clientWidth,
            height: that.$el.clientHeight,
            margin: { top: 20, bottom: 20, right: 20, left: 20 }
          };
        },
        svg: () => [that.remove().svg(), that.create().svg()]
      };
    },
    create() {
      let that = this;
      return {
        svg: () => {
          that.svg = d3.select(`.hexMap-container`)
              .append('svg')
              .attr('id', that.svgID)
              .attr('width', that.size.width)
              .attr('height', that.size.height);
        }
      };
    },
    remove() {
      let that = this;
      return {
        svg: () => d3.select(that.svgID).remove()
      };
    },
    test() {
    }
  }
};
</script>

<style scoped lang="sass">
@import "../../style/_sizes.sass"
@import "../../style/_colors.sass"
.hexMap-container
  width: 100%
  height: 100%

</style>
