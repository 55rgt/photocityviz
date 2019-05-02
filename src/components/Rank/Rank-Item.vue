<template lang="pug">
  .clusterRanking-item(:id="idx")
</template>

<script>
import * as d3 from 'd3';
import test from '../../../public/data/radarExample.json'
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
    let color = d3.scaleOrdinal().range(["#EDC951","#CC333F","#00A0B0"]);
    let radarChartOptions = {
      maxValue: 0.5,
      levels: 5,
      roundStrokes: true,
      color: color
    };
    //Call function to draw the Radar chart
    that.RadarChart(`#${that.idx}`, test, radarChartOptions);

    that.initialize().size();
    that.initialize().svgOption();
    // that.initialize().svg();
  },
  methods: {
    RadarChart(id, data, options) {
      const cfg = {
        w: 256,				//Width of the circle
        h: 180,				//Height of the circle
        margin: { top: 30, right: 10, bottom: 20, left: 10 }, //The margins of the SVG
        levels: 3,				//How many levels or inner circles should there be drawn
        maxValue: 0, 			//What is the value that the biggest circle will represent
        labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
        wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
        opacityArea: 0.35, 	//The opacity of the area of the blob
        dotRadius: 3, 			//The size of the colored circles of each blog
        opacityCircles: 0.1, 	//The opacity of the circles of each blob
        strokeWidth: 2, 		//The width of the stroke around each blob
        roundStrokes: true,	//If true the area and stroke will follow a round path (cardinal-closed)
        color: d3.schemeCategory10	//Color function
      };
      //Put all of the options into a variable called cfg
      if ('undefined' !== typeof options) {
        for (let i in options) if ('undefined' !== typeof options[i]) cfg[i] = options[i];
      }
      //If the supplied maxValue is smaller than the actual one, replace by the max in the data
      let maxValue = Math.max(cfg.maxValue, d3.max(data, (i) => d3.max(i.map(o => o.value))));
      let allAxis = (data[0].map((i, j) => i.axis)),	//Names of each axis
          total = allAxis.length,					//The number of different axes
          radius = Math.min(cfg.w / 2, cfg.h / 2), 	//Radius of the outermost circle
          Format = d3.format('%'),			 	//Percentage formatting
          angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"
      //Scale for the radius
      let rScale = d3.scaleLinear()
          .range([0, radius])
          .domain([0, maxValue]);

      /////////////////////////////////////////////////////////
      //////////// Create the container SVG and g /////////////
      /////////////////////////////////////////////////////////

      //Remove whatever chart with the same id/class was present before
      // d3.select(id).select('svg').remove();

      //Initiate the radar chart SVG
      let svg = d3.select(id).append('svg')
          .attr('width', cfg.w + cfg.margin.left + cfg.margin.right)
          .attr('height', cfg.h + cfg.margin.top + cfg.margin.bottom)
          .attr('class', 'radar' + id);
      //Append a g element
      let g = svg.append('g')
          .attr('transform', 'translate(' + (cfg.w / 2 + cfg.margin.left) + ',' + (cfg.h / 2 + cfg.margin.top) + ')');

      /////////////////////////////////////////////////////////
      ////////// Glow filter for some extra pizzazz ///////////
      /////////////////////////////////////////////////////////

      //Filter for the outside glow
      let filter = g.append('defs').append('filter').attr('id', 'glow'),
          feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur'),
          feMerge = filter.append('feMerge'),
          feMergeNode_1 = feMerge.append('feMergeNode').attr('in', 'coloredBlur'),
          feMergeNode_2 = feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

      /////////////////////////////////////////////////////////
      /////////////// Draw the Circular grid //////////////////
      /////////////////////////////////////////////////////////

      //Wrapper for the grid & axes
      let axisGrid = g.append('g').attr('class', 'axisWrapper');

      //Draw the background circles
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

      //Text indicating at what % each level is
      axisGrid.selectAll('.axisLabel')
          .data(d3.range(1, (cfg.levels + 1)).reverse())
          .enter().append('text')
          .attr('class', 'axisLabel')
          .attr('x', 4)
          .attr('y', d => -d * radius / cfg.levels)
          .attr('dy', '0.4em')
          .style('font-size', '10px')
          .attr('fill', '#737373')
          .text((d, i) => Number.parseInt(Format(maxValue * d / cfg.levels)));

      /////////////////////////////////////////////////////////
      //////////////////// Draw the axes //////////////////////
      /////////////////////////////////////////////////////////

      //Create the straight lines radiating outward from the center
      let axis = axisGrid.selectAll('.axis')
          .data(allAxis)
          .enter()
          .append('g')
          .attr('class', 'axis');
      //Append the lines
      axis.append('line')
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', (d, i) => rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2))
          .attr('y2', (d, i) => rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2))
          .attr('class', 'line')
          .style('stroke', 'white')
          .style('stroke-width', '2px');

      //Append the labels at each axis
      axis.append('text')
          .attr('class', 'legend')
          .style('font-size', '7px')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('x', (d, i) => rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2))
          .attr('y', (d, i) => rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2))
          .text(d => d)
          .call(wrap, cfg.wrapWidth);

      /////////////////////////////////////////////////////////
      ///////////// Draw the radar chart blobs ////////////////
      /////////////////////////////////////////////////////////

      //The radial line function
      let radarLine = d3.radialLine()
          .curve(d3.curveLinearClosed)
          .radius(d => rScale(d.value))
          .angle((d, i) => i * angleSlice);
      if (cfg.roundStrokes) {
        radarLine.curve(d3.curveCardinalClosed);
      }

      //Create a wrapper for the blobs
      let blobWrapper = g.selectAll('.radarWrapper')
          .data(data)
          .enter().append('g')
          .attr('class', 'radarWrapper');

      //Append the backgrounds
      blobWrapper
          .append('path')
          .attr('class', 'radarArea')
          .attr('d', (d, i) => radarLine(d))
          .style('fill', (d, i)  => {
            return cfg.color(i);
          })
          .style('fill-opacity', cfg.opacityArea)
          .on('mouseover', function (d, i) {
            //Dim all blobs
            d3.selectAll('.radarArea')
                .transition().duration(200)
                .style('fill-opacity', 0.1);
            //Bring back the hovered over blob
            d3.select(this)
                .transition().duration(200)
                .style('fill-opacity', 0.7);
          })
          .on('mouseout', function () {
            //Bring back all blobs
            d3.selectAll('.radarArea')
                .transition().duration(200)
                .style('fill-opacity', cfg.opacityArea);
          });

      //Create the outlines
      blobWrapper.append('path')
          .attr('class', 'radarStroke')
          .attr('d', (d, i) => radarLine(d))
          .style('stroke-width', cfg.strokeWidth + 'px')
          .style('stroke', (d, i) => cfg.color(i))
          .style('fill', 'none')
          .style('filter', 'url(#glow)');

      //Append the circles
      blobWrapper.selectAll('.radarCircle')
          .data((d, i) => d)
          .enter().append('circle')
          .attr('class', 'radarCircle')
          .attr('r', cfg.dotRadius)
          .attr('cx', (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
          .attr('cy', (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
          .style('fill', d => d.color)
          .style('fill-opacity', 0.8);

      /////////////////////////////////////////////////////////
      //////// Append invisible circles for tooltip ///////////
      /////////////////////////////////////////////////////////

      //Wrapper for the invisible circles on top
      let blobCircleWrapper = g.selectAll('.radarCircleWrapper')
          .data(data)
          .enter().append('g')
          .attr('class', 'radarCircleWrapper');

      //Append a set of invisible circles on top for the mouseover pop-up
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
                .attr('dy', '0.8em')
                .text(Number.parseInt(Format(d.value)))
                .style('font-size', '10px')
                .transition().duration(200)
                .style('opacity', 1);
          })
          .on('mouseout', function () {
            tooltip.transition().duration(200)
                .style('opacity', 0);
          });

      //Set up the small tooltip for when you hover over a circle
      let tooltip = g.append('text')
          .attr('class', 'tooltip')
          .style('opacity', 0);

      /////////////////////////////////////////////////////////
      /////////////////// Helper Function /////////////////////
      /////////////////////////////////////////////////////////

      //Taken from http://bl.ocks.org/mbostock/7555321
      //Wraps SVG text
      function wrap(text, width) {
        text.each(function () {
          let text = d3.select(this),
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
      }//wrap
    },
    initialize() {
      let that = this;
      return {
        size: () => {
          that.size = {
            width: that.$el.clientWidth,
            height: that.$el.clientHeight
          };
        },
        svgOption: () => {
          that.svgOption = {
            svgID: `${that.idx}_svg`,
          };
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

/deep/ .tooltip
  @include selectNone

</style>
