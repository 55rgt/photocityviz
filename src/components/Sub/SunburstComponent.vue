<template lang="pug">
  .treeMap-container#treeMap
</template>

<script>
/* eslint-disable no-unexpected-multiline */
import { EventBus } from '../../utils/event-bus';
import * as d3 from 'd3';
import _ from 'lodash';

export default {
  name: 'SunburstComponent',
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
                  .map(d => ({ name: d[0], value: d.length, cluster: v }))
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
      let partition = data => {
        const root = d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);
        return d3.partition()
            .size([2 * Math.PI, root.height + 1])
            (root);
      };
      let format = d3.format(',d');
      let width = 300;
      let radius = width / 6;
      let arc = d3.arc()
          .startAngle(d => d.x0)
          .endAngle(d => d.x1)
          .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
          .padRadius(radius * 1.5)
          .cornerRadius(d => 8 - d.depth * 5)
          .innerRadius(d => d.y0 * radius)
          .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));
      const root = partition(that.data);
      root.each(d => d.current = d);

      let svg = d3.select(`#treeMap`)
          .append('svg')
          .attr('viewBox', [0, 0, width, 324])
          .style('font', '10px sans-serif');

      const g = svg.append('g')
          .attr('transform', `translate(${width / 2},${324 / 2})`);

      const path = g.append('g')
          .selectAll('path')
          .data(root.descendants().slice(1))
          .join('path')
          .attr('fill', d => {
            while (d.depth > 1) d = d.parent;
            return that.shadeColor(that.color[d.data.cluster], 0);
          })
          .attr('fill-opacity', d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
          .attr('d', d => arc(d.current))
          // .attr('stroke', d => that.shadeColor(that.color[d.data.cluster], -20))
          // .attr('stroke-width', d => d.depth === 1 ? 0 : d.value / 1000);


      path.filter(d => d.children)
          .style('cursor', 'pointer')
          .on('click', clicked);

      path.append('title')
          .text(d => `${d.ancestors().map(d => d.data.name).reverse().join('/')}\n${format(d.value)}`);

      const label = g.append('g')
          .attr('pointer-events', 'none')
          .attr('text-anchor', 'middle')
          .style('user-select', 'none')
          .selectAll('text')
          .data(root.descendants().slice(1))
          .join('text')
          .attr('dy', '0.35em')
          .attr('fill-opacity', d => +labelVisible(d.current))
          .attr('transform', d => labelTransform(d.current))
          .style('font-size', '8px')
          .style('fill', d => that.shadeColor(that.color[d.data.cluster], -70))
          .text(d => d.data.name);

      const parent = g.append('circle')
          .datum(root)
          .attr('r', radius)
          .attr('fill', 'none')
          .attr('pointer-events', 'all')
          .on('click', clicked);


      function clicked(p) {
        parent.datum(p.parent || root);

        root.each(d => d.target = {
          x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
          x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
          y0: Math.max(0, d.y0 - p.depth),
          y1: Math.max(0, d.y1 - p.depth)
        });

        const t = g.transition().duration(750);

        path.transition(t)
            .tween('data', d => {
              const i = d3.interpolate(d.current, d.target);
              return t => d.current = i(t);
            })
            .filter(function (d) {
              return +this.getAttribute('fill-opacity') || arcVisible(d.target);
            })
            .attr('fill-opacity', d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
            .attrTween('d', d => () => arc(d.current));

        label.filter(function (d) {
          return +this.getAttribute('fill-opacity') || labelVisible(d.target);
        }).transition(t)
            .attr('fill-opacity', d => +labelVisible(d.target))
            .attrTween('transform', d => () => labelTransform(d.current));
      }

      function arcVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
      }

      function labelVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.06;
      }

      function labelTransform(d) {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2 * radius;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      }

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
