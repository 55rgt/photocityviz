<template lang="pug">
  .clusterRanking-item(:id="idx")
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'Rank-Item',
  props: ['idx'],
  data() {
    return {
      size: {},
      svg: undefined,
      svgOption: {}
    };
  },
  created() {

  },
  mounted() {
    let that = this;
    that.initialize().size();
    that.initialize().svgOption();
    that.initialize().svg();
  },
  methods: {
    initialize() {
      let that = this;
      return {
        size: () => {
          that.size = {
            width: that.$el.clientWidth,
            height: that.$el.clientHeight
          }
        },
        svgOption: () => {
          that.svgOption = {
            svgID: `${that.idx}_svg`,
            a: 3,
            b: 4,
            c: 5,
            d: { e: 4, f: 5 }
          }
        },
        svg: () => [that.remove().svg(), that.create().svg()]
      };
    },
    create() {
      let that = this;
      return {
        svg: () => {
          that.svg = d3.select(`.clusterRanking-item#${that.idx}`).append('svg')
              .attr('id', that.svgOption.svgID)
              .attr('width', that.size.width)
              .attr('height', that.size.height);
        }
      };
    },
    remove() {
      let that = this;
      return {
        svg: () => d3.select(that.svgOption.svgID).remove()
      };

    }
  }

};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
.clusterRanking-item
  min-width: $clusterRanking-canvas-width
  height: 100%
  background: #efefef

</style>
