<template lang="pug">
  .hexMap#hexMap
</template>

<script>
import * as d3 from 'd3';
import * as hexbin from 'd3-hexbin';
import { EventBus } from '../../utils/event-bus';
import _ from 'lodash';

export default {
  name: 'Hex_',
  data() {
    return {
      width: 660,
      height: 940,
      svg: null,
      hexDataset: null,
      axisX: 'x',
      axisY: 'y',
      hexData: {},
      colors: this.$store.getters.getColors,
      svgID: 'hexMapSVG',
      options: JSON.parse(JSON.stringify(this.$store.getters.getOption)),
      selectedData: JSON.parse(JSON.stringify(this.$store.getters.getSelectedData)),
      cohesion: null,
      hexRadius: null,
      minCluster: null,
      maxCluster: null,
      scale_min: 1 / 20,
      scale_max: 3,
      points: [],
      bins: [],
      r: null,
      isDown: false,
      currentScale: null
    };
  },
  created() {
    let that = this;
    console.log('created Hook');
    EventBus.$on('apply', () => {
      that.update();
    });
  },
  methods: {
    update() {
      this.remove();
      this.init();
      this.prepare();
      this.render();
    },
    remove() {
      let that = this;
      d3.select(`#${that.svgID}`).remove();
    },
    init() {
      let that = this;
      that.options = JSON.parse(JSON.stringify(this.$store.getters.getOption)); // 이거 복사 안 하고 받으면 이거 안 쓰고 json 안 하고 그냥 변경 바로바ㅗㄹ 될듯?
      that.selectedData = JSON.parse(JSON.stringify(this.$store.getters.getSelectedData)); // 얘도 마찬가지
      that.cohesion = that.options.cohesion;
      that.hexRadius = that.options.hexRadius;
      that.minCluster = null;
      that.maxCluster = null;
      that.scale_min = 1 / 20;
      that.scale_max = 3;
      that.points = [];
      that.bins = [];
      that.r = null;
      that.isDown = false;
      that.currentScale = null;

    },
    prepare() {
      let that = this;

      that.hexbin = hexbin.hexbin().extent([[0, 0], [that.width, that.height]]).radius(that.hexRadius);

      let dataGroup = _.groupBy(that.selectedData, d => d['clusterGroup']);

      _.forEach(dataGroup, (value, key) => {
        let points = _.map(value, (d) => [d[that.axisX] * that.width / that.cohesion, d[that.axisY] * that.height / that.cohesion, d['name']]); // 이쪽 것도 radius에 맞게 조절 필요할
        let bin = _.map(that.hexbin(points), hex => {
          hex['cluster'] = Number.parseInt(key);
          // selected에 대한 걸 여기서 해준다.
          return hex;
        });
        that.bins.push(bin);
      });

      let flatten = _.flatten(that.bins);
      that.bins = _.orderBy(flatten, ['length'], ['desc']);
      console.log(that.bins);

      let min = d3.min(that.bins, d => d.length);
      let max = d3.max(that.bins, d => d.length);
      console.log(min, max);

      that.r = d3.scaleSqrt()
          .domain([min, max])
          .range([Math.min(0.5, Math.pow(min / max, 0.25)) * that.hexbin.radius() * Math.SQRT2, Math.min(2, max / min, 2.25) * that.hexbin.radius() * Math.SQRT2]);

    },
    render() {
      let that = this;
      that.svg = d3.select('#hexMap')
          .append('svg')
          .attr('id', that.svgID)
          .attr('width', that.width)
          .attr('height', that.height);

      let zoom_layer = that.svg.append('g');
      let selectedLabels = that.$store.getters.getSelectedLabels;
      that.zoom = d3.zoom()
          .scaleExtent([that.scale_min, that.scale_max]) // SCALE_MIN , MAX도 반지름에 맞게 init에서  조절?
          .on('zoom', () => {
            zoom_layer.attr('transform', d3.event.transform);
            that.currentScale = d3.event.transform.k;
          });
      that.svg.call(that.zoom)
          .on('mousedown.zoom', null);

      that.svg.call(that.zoom.transform, d3.zoomIdentity.translate(that.width / 2, that.height / 2).scale(that.scale_min));

      that.svg.on('mousedown', function () {
        that.startDragArea(d3.mouse(this));
      });
      that.svg.on('mousemove', function () {
        that.updateDragArea(d3.mouse(this));
      });
      that.svg.on('mouseup', function () {
        that.finishDragArea(d3.mouse(this));
      });
      zoom_layer
          .selectAll('path')
          .data(that.bins)
          .join('path')
          .on('click', function (d) {
            if (_.isNil(d['selected'])) d['selected'] = true;
            else d['selected'] = !d['selected'];
            if (d['selected']) {
              d3.select(this).attr('stroke', d => `${that.shadeColor(that.colors[Number.parseInt(d['cluster'])], -50)}`)
                  .attr('stroke-width', that.hexRadius / 4)
                  .attr('stroke-opacity', 0.8);
            } else {
              d3.select(this).attr('stroke', '#000')
                  .attr('stroke-width', 2)
                  .attr('stroke-opacity', 0.8);
            }
            console.log([d.x * that.cohesion / that.width, d.y * that.cohesion / that.height]);
          })
          .attr('stroke', d => `${that.shadeColor(that.colors[Number.parseInt(d['cluster'])], -50)}`)
          // .attr('stroke-width', d => selectedLabels.includes(d['cluster']) ? that.hexRadius / 4 : 2)
          .attr('stroke-width', d => selectedLabels.includes(d['cluster']) ? that.hexRadius / 4 : 2)
          // .attr('stroke', '#000')
          .attr('stroke-opacity', 0.8)
          // .attr('stroke-width', 2) // 얘도 그거에 따라 반지름에 따
          .attr('d', d => that.hexbin.hexagon(that.r(d.length)))
          // .attr('d', that.hexbin.hexagon())
          .attr('id', d => `hex_${Math.floor(d['x'])}_${Math.floor(d['y'])}_${d['cluster']}`)
          .attr('transform', d => `translate(${d.x},${d.y})`)
          .attr('fill', d => `${that.shadeColor(that.colors[Number.parseInt(d['cluster'])], 0)}`)
          // .attr('fill', d => selectedLabels.includes(d['cluster']) ? `${that.shadeColor(that.colors[Number.parseInt(d['cluster'])], 0)}` : 'none')
          .attr('fill-opacity', d => selectedLabels.includes(d['cluster']) ? 0.6 : 0.05);

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
    startDragArea(d) {
      let that = this;
      that.startX = d[0];
      that.startY = d[1];
      that.isDown = true;
      that.svg.append('path')
          .attr('id', `drag_${that.svgID}`)
          .attr('d', `M ${that.startX} ${that.startY}`)
          .attr('fill', '#fbe9c3')
          .attr('fill-opacity', 0.2)
          .attr('stroke', that.shadeColor('#fbe9c3', -30))
          .attr('stroke-width', 2);
    },
    updateDragArea(d) {
      let that = this;
      if (that.isDown) {
        d3.select(`#drag_${that.svgID}`)
            .attr('d', `M ${that.startX} ${that.startY} L ${d[0]} ${that.startY}
            L ${d[0]} ${d[1]} L ${that.startX} ${d[1]} L ${that.startX} ${that.startY}`);
      }
    },
    finishDragArea(d) {
      let that = this;

      that.isDown = false;
      d3.select(`#drag_${that.svgID}`).remove();
      console.log(that.currentScale);

      let csx = (that.cohesion / that.width) / that.currentScale;
      let csy = (that.cohesion / that.height) / that.currentScale;
      let cex = (that.cohesion / that.width) / that.currentScale;
      let cey = (that.cohesion / that.height) / that.currentScale;

      if (d[0] < that.startX) {
        csx *= (d[0] - (that.width / 2));
        cex *= (that.startX - (that.width / 2));
      } else {
        cex *= (d[0] - (that.width / 2));
        csx *= (that.startX - (that.width / 2));
      }
      if (d[1] < that.startY) {
        csy *= (d[1] - (that.height / 2));
        cey *= (that.startY - (that.height / 2));
      } else {
        cey *= (d[1] - (that.height / 2));
        csy *= (that.startY - (that.height / 2));
      }
      console.log([csx, csy], [cex, cey]);

      let selectedBins = _.filter(that.bins, bin =>
          bin['x'] * that.cohesion / that.width >= csx && bin['x'] * that.cohesion / that.width <= cex &&
          bin['y'] * that.cohesion / that.height >= csy && bin['y'] * that.cohesion / that.height <= cey);
      console.log(selectedBins);


    }
  }
};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.hexMap
  width: 100%
  height: 100%
  padding-bottom: $unit-3
</style>
