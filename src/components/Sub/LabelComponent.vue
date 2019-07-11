<template lang="pug">
  .label-container
</template>

<script>
import { EventBus } from '../../utils/event-bus';
import * as d3 from 'd3';
import _ from 'lodash';

export default {
  name: 'LabelComponent',
  props: {
    index: Number
  },
  data() {
    return {
      radarChartOptions: {
        w: 324 - 40,
        h: 324 - 40,
        margin: { top: 20, right: 20, bottom: 20, left: 20 },
        levels: 5,
        roundStrokes: true,
        color: this.$store.getters.getColors,
      },
      svg: null,
      ID: 'labelDist_' + this.$props.index
    };
  },
  created() {
    let that = this;
    EventBus.$on('apply', async () => {
      that.reset();
      await that.$store.dispatch('updateSelectedLabels');
    });
    EventBus.$on('updateLabelComponent', async () => {
      that.update(this.$store.getters.getSelectedDistribution, that.radarChartOptions);
      await that.$store.dispatch('updateSelectedLabels');
    });
    EventBus.$on('renderLabel', async () => {
      that.update(this.$store.getters.getSelectedDistribution, that.radarChartOptions);
    });

  },
  methods: {
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
    reset() {
      let that = this;
      d3.select(`#${that.ID}`).select('svg').remove();
    },
    update(dt, options) {
      let that = this;
      let sLabels = that.$store.getters.getSelectedLabels;
      let data = _.chain(dt)
          .filter(d => sLabels.includes(d.cluster))
          .map(d => _.map(d.dist, e => ({label: e.label, value: e.value, cluster: d.cluster })))
          .value();


      let maxValue = that.$store.getters.getMaxLabelCount;
      let cfg = {
        w: 300,
        h: 300,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        levels: 5,
        maxValue: 0.5,
        labelFactor: 1.06,
        wrapWidth: 60,
        opacityArea: 0.35,
        dotRadius: 3,
        opacityCircles: 0.1,
        strokeWidth: 2,
        roundStrokes: false,
        color: this.$store.getters.getColors
      };
      that.radarChartOptions.color = this.$store.getters.getColors;

      maxValue = Math.max(maxValue, cfg.maxValue);

      if ('undefined' !== typeof options) {
        for (let i in options) {
          if ('undefined' !== typeof options[i]) cfg[i] = options[i];
        }
      }

      var allAxis = _.map(data[0], d => d.label),
          total = allAxis.length,
          radius = Math.min(cfg.w / 2, cfg.h / 2),
          angleSlice = Math.PI * 2 / total;

      var rScale = d3.scaleLinear()
          .range([0, radius]) // ?
          .domain([-0.2 * maxValue, maxValue]);

      d3.select(`#${that.ID}`).select('svg').remove();

      that.svg = d3.select(`#${that.ID}`)
          .append('svg')
          .attr('width', cfg.w + cfg.margin.left + cfg.margin.right)
          .attr('height', cfg.h + cfg.margin.top + cfg.margin.bottom)
          .attr('class', 'radar' + that.ID);

      let g = that.svg.append('g')
          .attr('transform', 'translate(' + (cfg.w / 2 + cfg.margin.left) + ',' + (cfg.h / 2 + cfg.margin.top) + ')');

      var filter = g.append('defs').append('filter').attr('id', 'glow'),
          feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur'),
          feMerge = filter.append('feMerge'),
          feMergeNode_1 = feMerge.append('feMergeNode').attr('in', 'coloredBlur'),
          feMergeNode_2 = feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

      let axisGrid = g.append('g').attr('class', 'axisWrapper');

      axisGrid.selectAll('.levels')
          .data(d3.range(1, (cfg.levels + 1)).reverse())
          .enter()
          .append('circle')
          .attr('class', 'gridCircle')
          .attr('r', (d, i) => radius / cfg.levels * d)
          .style('fill', '#CDCDCD')
          .style('stroke', '#CDCDCD')
          .style('fill-opacity', cfg.opacityCircles)
          .style('filter', 'url(#glow)');

      var axis = axisGrid.selectAll('.axis')
          .data(allAxis)
          .enter()
          .append('g')
          .attr('class', 'axis');


      axis.append('line')
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', (d, i) => rScale(maxValue) * Math.cos(angleSlice * i - Math.PI / 2))
          .attr('y2', (d, i) => rScale(maxValue) * Math.sin(angleSlice * i - Math.PI / 2))
          .attr('class', 'line')
          .style('stroke', 'white')
          .style('stroke-width', '1px');

      let query = that.$store.getters.getLabelQuery;
      if (_.compact(_.concat(_.invertBy(query)['must'], _.invertBy(query)['maybe'])).length <= 15) {

        axis.append('text')
            .attr('class', 'legend')
            .style('font-size', '8px')
            .attr('text-anchor', 'middle')
            .attr('dy', '0em')
            .attr('x', (d, i) => rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr('y', (d, i) => rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2))
            .attr('transform', (d, i) =>
                ` translate(${rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2)}, ${rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2)})
                rotate(${((360 / total) * i) - 360})
                translate(${-1 * rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2)}, ${-1 * rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2)})
              `
            )
            .text(d => d.includes('Transportation') ? d.replace('Transportation', 'Trans.') : d)
            .call(wrap, cfg.wrapWidth);

      }
      let radarLine = d3.radialLine()
          .curve(d3.curveLinearClosed)
          .radius(d => rScale(d.value))
          .angle((d, i) => i * angleSlice);

      if (cfg.roundStrokes) radarLine.curve(d3.curveCatmullRomClosed.alpha(0.25));

      let blobWrapper = g.selectAll('.radarWrapper')
          .data(data)
          .enter().append('g')
          .attr('class', 'radarWrapper');

      blobWrapper
          .append('path')
          .attr('class', 'radarArea')
          .attr('d', (d, i) => radarLine(d))
          .style('fill', d => cfg.color[d[0].cluster])
          .style('fill-opacity', cfg.opacityArea)
          .on('mouseover', function (d,i){
            //Dim all blobs
            d3.selectAll(".radarArea")
                .transition().duration(200)
                .style("fill-opacity", 0.1);
            //Bring back the hovered over blob
            d3.select(this)
                .transition().duration(200)
                .style("fill-opacity", 0.7);
          })
          .on('mouseout', function(){
            //Bring back all blobs
            d3.selectAll(".radarArea")
                .transition().duration(200)
                .style("fill-opacity", cfg.opacityArea);
          });
          // mouseover and out evt

      blobWrapper.append('path')
          .attr('class', 'radarStroke')
          .attr('d', (d, i) => radarLine(d))
          .style('stroke-width', cfg.strokeWidth + 'px')
          .style('stroke', d => that.shadeColor(cfg.color[d[0].cluster], -20))
          .style('fill', 'none')
          .style('filter', 'url(#glow)');

      blobWrapper.selectAll('.radarCircle')
          .data((d, i) => d)
          .enter().append('circle')
          .attr('class', 'radarCircle')
          .attr('r', cfg.dotRadius)
          .attr('cx', (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
          .attr('cy', (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
          .style('fill', d => that.shadeColor(cfg.color[d.cluster], -40))
          .style('fill-opacity', 0.9);

      let blobCircleWrapper = g.selectAll('.radarCircleWrapper')
          .data(data)
          .enter().append('g')
          .attr('class', 'radarCircleWrapper');

      blobCircleWrapper.selectAll('.radarInvisibleCircle')
          .data((d, i) => d)
          .enter().append('circle')
          .attr('class', 'radarInvisibleCircle')
          .attr('r', cfg.dotRadius * 1.5)
          .attr('cx', (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
          .attr('cy', (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
          .style('fill', 'none')
          .style('pointer-events', 'all')
          .on('mouseover', function (d, i) {
            let newX = parseFloat(d3.select(this).attr('cx'));
            let newY = parseFloat(d3.select(this).attr('cy'));
            tooltip
                .attr('x', newX - 2 * `${d.label}: ${d.value}`.length)
                .attr('y', newY - 10)
                .text(`${d.label}: ${d.value}`)
                .transition().duration(200)
                .style('fill', that.shadeColor(cfg.color[d.cluster], -60))
                .style('opacity', 1);
          })
          .on('mouseout', () => tooltip.transition().duration(200).style('opacity', 0));

      let tooltip = g.append('text')
          .style('font-weight', 500)
          .style('font-size', '10px')
          .attr('class', 'tooltip')
          .style('opacity', 0);


      function wrap(text, width) {
        text.each(function () {
          var text = d3.select(this),
              words = text.text().split(/\s+/).reverse(),
              word,
              line = [],
              lineNumber = 0,
              lineHeight = 1.4, // ems
              y = text.attr('y'),
              x = text.attr('x'),
              dy = parseFloat(text.attr('dy')),
              tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', dy + 'em');
          while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(' '));
            if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(' '));
              line = [word];
              tspan = text.append('tspan').attr('x', x).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
            }
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/styles"
.label-container
  width: 324px
  height: 324px
  box-sizing: inherit
  transition: 0.2s
  border-radius: $unit-5
</style>
