<template lang="pug">
  .treeMap-container#treeMap
</template>

<script>
/* eslint-disable no-unexpected-multiline */
import { EventBus } from '../../utils/event-bus';
import * as d3 from 'd3';
import _ from 'lodash';

export default {
  name: 'TreeMapComponent',
  data() {
    return {
      data: null,
      color: this.$store.getters.getColors,
    };
  },
  created() {
    let that = this;
    EventBus.$on('updateLabelComponent', async () => {
      that.init();
    });
    EventBus.$on('updateLabelComponent', async () => {
      that.init();
      that.update();
      that.render();
    });
  },
  methods: {
    init() {
      this.color = this.$store.getters.getColors;
      d3.select('#treeMap').select('svg').remove();
    },
    update() {
      let that = this;

      that.data = {
        name: this.$store.getters.getSelectedClusterName,
        children: _.chain(this.$store.getters.getSelectedData)
            .filter(d => d.selected)
            .groupBy(d => d['clusterGroup'])
            .map((k, v) => ({
              name: '',
              cluster: v,
              children: _.chain(_.flatten(_.map(k, ele => ele.labels)))
                  .groupBy()
                  .map(d => ({ name: d[0], value: d.length, cluster: v}))
                  .value()
            }))
            .value()
      };

      console.log(that.data);

    },
    shadeColor(color, percent) {
      var R = parseInt(color.substring(1, 3), 16);
      var G = parseInt(color.substring(3, 5), 16);
      var B = parseInt(color.substring(5, 7), 16);

      R = parseInt(R * (100 + percent) / 100);
      G = parseInt(G * (100 + percent) / 100);
      B = parseInt(B * (100 + percent) / 100);

      R = (R < 255) ? R : 255;
      G = (G < 255) ? G : 255;
      B = (B < 255) ? B : 255;

      var RR = ((R.toString(16).length === 1) ? '0' + R.toString(16) : R.toString(16));
      var GG = ((G.toString(16).length === 1) ? '0' + G.toString(16) : G.toString(16));
      var BB = ((B.toString(16).length === 1) ? '0' + B.toString(16) : B.toString(16));

      return '#' + RR + GG + BB;
    },
    render() {
      let that = this;

      let update = () => {
        let selparent = dataAggregated;

        let nodes = svg.selectAll(".node")
            .data(rootWithLayout.leaves());

        nodes
            .enter()
            .append("rect")
            .attr("class", "node")
            .merge(nodes)
            .on("click", (d) => {
              selparent = d.parent.parent;
              x.domain([d.parent.x0, d.parent.x0 + d.parent.x1-d.parent.x0]);
              y.domain([d.parent.y0, d.parent.y0 + d.parent.y1-d.parent.y0]);
              update();
            })
            .transition().duration(1000)
            .attr("x", (d)=> x(d.x0))
            .attr("y",  (d)=> y(d.y0))
            .attr("width", (d)=> x(d.x1)-x(d.x0))
            .attr("height", (d)=> y(d.y1)-y(d.y0))
            .attr("title", (d) => d.name)
            .style("fill", (d) => c(d.parent ? d.parent.data.name : d.data.name))

        let parent = svg.selectAll("#parent")
            .data([""])

        parent.enter()
            .append("rect")
            .attr("id","parent")
            .merge(parent)
            .on("click", () => {
              x.domain([selparent.x0, selparent.x1-selparent.x0]);
              y.domain([selparent.y0, selparent.y1-selparent.y0]);
              update();
            })
            .style("fill", "orange")
            .transition().duration(1000)
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", width)
            .attr("height", y.range()[0]-1)
      }
      return update;
    }


  }
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/styles"
.treeMap-container
  width: 300px
  height: 324px
  box-sizing: inherit
  transition: 0.2s
  border-radius: $unit-5

</style>
