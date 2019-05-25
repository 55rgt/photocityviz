<template lang="pug">
  .clusterRanking-wrapper
    .clusterRanking-item(@click="selectRankItem" :id="modelData.id")

</template>

<script>
import * as d3 from 'd3';
import _ from 'lodash';
import { EventBus } from '../../utils/event-bus';

export default {
  name: 'Rank-Item',
  props: {
    modelData: Object
  },
  data() {
    return {
      axisList: ['Average', 'C-index', 'Calinski', 'Davis_B', 'Dunn', 's_Dbw', 'SD_Dis', 'SD_Scat', 'Silhouette'],
      radarChartOptions: {
        w: 164 - 40,
        h: 164 - 40,
        margin: { top: 20, right: 20, bottom: 20, left: 20 },
        maxValue: 100,
        levels: 5,
        roundStrokes: true,
        color: 'pink'
      },
      svg: null,
    };
  },
  mounted() {
    let that = this;
    that.ID = that.modelData.id;
    that.RadarChart('.radarChart', that.RadarData(), that.radarChartOptions);
  },
  methods: {
    selectRankItem() {
      let that = this;
      EventBus.$emit('selectRankItem', that.ID);
      // Selected Cluster에 에밋하기
    },
    RadarData() {
      let that = this;
      return [_.reduce(that.axisList, (result, value) => {
        result.push({
          axis: value,
          value: that.modelData[value]
        });
        return result;
      }, [])];
    },
    RadarChart(id, data, options) {
      let that = this;
      let cfg = {
        w: 124,				//Width of the circle
        h: 124,				//Height of the circle
        margin: { top: 0, right: 0, bottom: 0, left: 0 }, //The margins of the SVG
        levels: 3,				//How many levels or inner circles should there be drawn
        maxValue: 100, 			//What is the value that the biggest circle will represent
        labelFactor: 1.06, 	//How much farther than the radius of the outer circle should the labels be placed
        wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
        opacityArea: 0.35, 	//The opacity of the area of the blob
        dotRadius: 2, 			//The size of the colored circles of each blog
        opacityCircles: 0.1, 	//The opacity of the circles of each blob
        strokeWidth: 2, 		//The width of the stroke around each blob
        roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
        color: 'pink'	//Color function
      };
      if ('undefined' !== typeof options) {
        for (let i in options) {
          if ('undefined' !== typeof options[i]) cfg[i] = options[i];
        }
      }

      let maxValue = 100;
      var allAxis = that.axisList,	//Names of each axis
          total = allAxis.length,					//The number of different axes
          radius = Math.min(cfg.w / 2, cfg.h / 2), 	//Radius of the outermost circle
          angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"

      var rScale = d3.scaleLinear()
          .range([0, radius])
          .domain([0, maxValue]);

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
          .attr('x2', (d, i) => rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2))
          .attr('y2', (d, i) => rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2))
          .attr('class', 'line')
          .style('stroke', 'white')
          .style('stroke-width', '1px');

      axis.append('text')
          .attr('class', 'legend')
          .style('font-size', '7px')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('x', (d, i) => rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2))
          .attr('y', (d, i) => rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2))
          .text(d => d)
          .call(wrap, cfg.wrapWidth);

      let radarLine = d3.radialLine()
          .curve(d3.curveLinearClosed)
          .radius(d => rScale(d.value))
          .angle((d, i) => i * angleSlice);

      if (cfg.roundStrokes) radarLine.curve(d3.curveCardinalClosed);

      let blobWrapper = g.selectAll('.radarWrapper')
          .data(data)
          .enter().append('g')
          .attr('class', 'radarWrapper');

      blobWrapper
          .append('path')
          .attr('class', 'radarArea')
          .attr('d', (d, i) => radarLine(d))
          .style('fill', '#fac85c')
          .style('fill-opacity', cfg.opacityArea);

      blobWrapper.append('path')
          .attr('class', 'radarStroke')
          .attr('d', (d, i) => radarLine(d))
          .style('stroke-width', cfg.strokeWidth + 'px')
          .style('stroke', '#8a6c34')
          .style('fill', 'none')
          .style('filter', 'url(#glow)');

      blobWrapper.selectAll('.radarCircle')
          .data((d, i) => d)
          .enter().append('circle')
          .attr('class', 'radarCircle')
          .attr('r', cfg.dotRadius)
          .attr('cx', (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
          .attr('cy', (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
          .style('fill', '#2e2510')
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
            let newX = parseFloat(d3.select(this).attr('cx')) - 10;
            let newY = parseFloat(d3.select(this).attr('cy')) - 10;
            tooltip
                .attr('x', newX)
                .attr('y', newY)
                .text(d.value + '%')
                .transition().duration(200)
                .style('opacity', 1);
          })
          .on('mouseout', () => tooltip.transition().duration(200).style('opacity', 0));

      let tooltip = g.append('text')
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
.clusterRanking-wrapper
  width: 180px
  height: 100%
  padding: 8px
  border-radius: 8px
  transition: 0.24s
  position: relative
  &:hover
    background: rgba(0, 0, 0, 0.1)
  .clusterRanking-item
    width: 100%
    height: 100%
</style>
