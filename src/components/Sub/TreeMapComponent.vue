<template lang="pug">
  .treeMap-container#treeMap
</template>

<script>
/* eslint-disable no-unexpected-multiline */

import { EventBus } from '../../utils/event-bus';
import * as d3 from 'd3';
import _ from 'lodash';
// import data from '../../../public/data/flare';

export default {
  name: 'TreeMapComponent',
  data() {
    return {
      data: null,
    };
  },
  created() {
    let that = this;
    EventBus.$on('updateLabelComponent', async () => {
      console.log('updateLabel in Sunburst');
      // console.log(this.$store.getters.getSelectedData)
      that.update();
      that.render();
      /*

      selected된 데이터를 가져온 다음에, flare.json 형식으로 만든다. 공현식.
       */
    })
  },
  mounted() {
    let that = this;

  },
  methods: {
    update() {
      let that = this;

      that.data = _.chain(this.$store.getters.getSelectedData)
          .filter(d => d.selected)
          .groupBy(d => d['clusterGroup'])
          .map((k, v) => ({
            name: v,
            children: _.chain(_.flatten(_.map(k, ele => ele.labels)))
                .groupBy()
                .map(d => ({name: d[0], value: d.length}))
                .value()
          }))
          .value();

      console.log(that.data);


      // console.log(_.chain(that.dt)
      //     .filter(d => d.selected)
      //     .value()[0])
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
      let color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, that.data.children.length + 1));
      let format = d3.format(',d');
      let width = 300;
      let radius = width / 6;
      let arc = d3.arc()
          .startAngle(d => d.x0)
          .endAngle(d => d.x1)
          .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
          .padRadius(radius * 1.5)
          .innerRadius(d => d.y0 * radius)
          .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));
      const root = partition(that.data);
      root.each(d => d.current = d);



      let svg = d3.select(`#treeMap`)
          .append('svg')
          .attr('viewBox', [0, 0, width, width])
          .style('font', '10px sans-serif');

      const g = svg.append('g')
          .attr('transform', `translate(${width / 2},${width / 2})`);

      const path = g.append('g')
          .selectAll('path')
          .data(root.descendants().slice(1))
          .join('path')
          .attr('fill', d => {
            while (d.depth > 1) d = d.parent;
            return color(d.data.name);
          })
          .attr('fill-opacity', d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
          .attr('d', d => arc(d.current));

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
          .style('font-size', '8px') // 수정 필요
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

        // Transition the data on all arcs, even the ones that aren’t visible,
        // so that if this transition is interrupted, entering arcs will start
        // the next transition from the desired position.
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
