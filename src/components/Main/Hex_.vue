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
      width: 864 + 140,
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
      scale_min: 1 / 100,
      scale_max: 3,
      points: [],
      bins: [],
      clusterLength: this.$store.getters.getSelectedClusterLength,
      r: null,
      isDown: false,
      currentScale: null
    };
  },
  created() {
    let that = this;
    EventBus.$on('apply', () => {
      that.update(true);
    });
    EventBus.$on('updateHex', () => {
      that.update(false);
    });
  },
  methods: {
    update(state) {
      this.remove();
      this.init(state);
      this.prepare();
      this.relocate();
      this.render();
    },
    remove() {
      let that = this;
      d3.select(`#${that.svgID}`).remove();
    },
    relocate() {
      let that = this;
      that.bins = _.orderBy(that.bins, ['x', 'y', 'length'], ['asc', 'asc', 'desc']);
      for (let i = 0; i < that.bins.length; i++) {
        let a = that.bins[i];
        for (let j = i + 1; j < that.bins.length; j++) {
          let b = that.bins[j];
          that.checkCollision(a, b);
        }
      }
      that.bins = _.orderBy(that.bins, ['length'], ['desc']);
    },
    checkCollision(lt, rb) {
      let that = this;
      const d = Math.sqrt(Math.pow(lt.x - rb.x, 2) + Math.pow(lt.y - rb.y, 2));
      if (d >= lt.radius + rb.radius) {
        return 0;
      } else {
        if (lt.x === rb.x && lt.y === rb.y) {
          let newX = 2 * (lt.radius + rb.radius) / that.clusterLength * rb.cluster + lt.x - (lt.radius + rb.radius);
          let mark = rb.cluster % 2 === 0 ? 1 : -1;
          let newY = Math.floor(mark * Math.sqrt(Math.pow(lt.radius + rb.radius, 2) - Math.pow(newX - lt.x, 2)) + lt.y);
          rb.x = Math.floor(newX);
          rb.y = newY;
          return 1;
        }
        // else {
        //   let newX = (lt.radius + rb.radius) * (rb.x - lt.x) / d + lt.x;
        //   let newY = Math.floor((rb.y - lt.y) / (rb.x - lt.x) * (newX - rb.x) + rb.y);
        //   rb.x = Math.floor(newX);
        //   rb.y = newY;
        //   return 1;
        // }
      }
    },
    init(state) {
      let that = this;
      that.options = JSON.parse(JSON.stringify(this.$store.getters.getOption)); // 이거 복사 안 하고 받으면 이거 안 쓰고 json 안 하고 그냥 변경 바로바ㅗㄹ 될듯?
      that.selectedData = JSON.parse(JSON.stringify(this.$store.getters.getSelectedData)); // 얘도 마찬가지
      that.cohesion = that.options.cohesion;
      that.hexRadius = that.options.hexRadius;
      that.scale_min = 1 / 100;
      that.scale_max = 3;
      that.points = [];
      that.bins = [];
      that.r = null;
      that.isDown = false;
      that.currentScale = state ? 1 / 4.5 : that.currentScale;
      that.currentX = null;
      that.currentY = null;

    },
    prepare() {
      let that = this;
      that.hexbin = hexbin.hexbin().extent([[0, 0], [that.width, that.height]]).radius(that.hexRadius);
      let dataGroup = _.groupBy(that.selectedData, d => d['clusterGroup']);
      let arr = _.flatten(_.map(dataGroup));
      let max_min = {
        maxX: _.maxBy(arr, (e) => e.x).x,
        maxY: _.maxBy(arr, (e) => e.y).y,
        minX: _.minBy(arr, (e) => e.x).x,
        minY: _.minBy(arr, (e) => e.y).y
      };
      _.forEach(dataGroup, (value, key) => {
        let points = _.map(value, (d) =>
            [
              (d.x - max_min.minX) / (max_min.maxX - max_min.minX) * that.width * 4,
              (d.y - max_min.minY) / (max_min.maxY - max_min.minY) * that.height * 4,
              d['name'],
              d['selected']]);
        let bin = _.map(that.hexbin(points), hex => {
          hex['cluster'] = Number.parseInt(key);
          hex['selected'] = _.map(hex, h => h[3]).includes(true);
          hex['radius'] = Math.floor(+hex.length * 1.25) > 300 ? 300 : 9 + Math.floor(+hex.length * 1.25);
          hex['x'] = Math.floor(+hex.x);
          hex['y'] = Math.floor(+hex.y);
          return hex;
        });
        that.bins.push(bin);
      });

      let flatten = _.flatten(that.bins);
      that.bins = _.orderBy(flatten, ['length'], ['desc']);
    },
    render() {
      let that = this;
      that.svg = d3.select('#hexMap')
          .append('svg')
          .attr('id', that.svgID)
          .attr('width', that.width)
          .attr('height', that.height);

      let zoom_layer = that.svg.append('g');
      that.zoom = d3.zoom()
          .scaleExtent([that.scale_min, that.scale_max]) // SCALE_MIN , MAX도 반지름에 맞게 init에서  조절?
          .on('zoom', () => {
            zoom_layer.attr('transform', d3.event.transform);
            that.currentScale = d3.event.transform.k;
            that.currentX = d3.event.transform.x;
            that.currentY = d3.event.transform.y;
          });
      that.svg.call(that.zoom)
          .on('mousedown.zoom', null);

      that.svg.call(that.zoom.transform, d3.zoomIdentity.translate(30, 90).scale(that.currentScale));

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
          .attr('stroke', d => `${that.shadeColor(that.colors[Number.parseInt(d['cluster'])], -50)}`)
          .attr('stroke-width', d => d.selected ? that.hexRadius / 12 : Math.max(that.hexRadius / 16, 2))
          .attr('stroke-opacity', 0.8)
          .attr('d', d => that.hexbin.hexagon(d.radius))
          .attr('id', d => `hex_${Math.floor(d['x'])}_${Math.floor(d['y'])}_${d['cluster']}`)
          .attr('transform', d => `translate(${d.x},${d.y})`)
          .attr('fill', d => `${that.shadeColor(that.colors[Number.parseInt(d['cluster'])], 0)}`)
          .attr('fill-opacity', d => d.selected ? 0.6 : 0.015)
          .on('click', async d => {
              await that.$store.dispatch('updateSelected',
                  {
                      'evt': 'click',
                      'newState': !d.selected,
                      'data': _.map(d, a => a[2]) // 이런 거 다 바꿀 수 있다.
                  });
              await EventBus.$emit('updateHex');
              await EventBus.$emit('updateLabelComponent');
              await EventBus.$emit('initClusterComponent');
          })
          .on('mouseover', async function (d) {
              if(!that.isDown && d.selected) {
                  d3.select(this)
                      .attr('fill', d => `${that.shadeColor(that.colors[Number.parseInt(d['cluster'])], -30)}`);
              }
          })
          .on('mouseout', async function (d) {
              if(!that.isDown && d.selected) {
                  d3.select(this)
                      .attr('fill', d => `${that.shadeColor(that.colors[Number.parseInt(d['cluster'])], 0)}`);
              }
          })

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
    async finishDragArea(d) {
      let that = this;

      that.isDown = false;
      d3.select(`#drag_${that.svgID}`).remove();

      if (Math.abs(d[0] - that.startX) <= 2 && Math.abs(d[1] - that.startY) <= 2) return;
      let csx = 1 / that.currentScale;
      let csy = 1 / that.currentScale;
      let cex = 1 / that.currentScale;
      let cey = 1 / that.currentScale;

      if (d[0] < that.startX) {
        csx *= (d[0] - (that.currentX));
        cex *= (that.startX - (that.currentX));
      } else {
        cex *= (d[0] - (that.currentX));
        csx *= (that.startX - (that.currentX));
      }
      if (d[1] < that.startY) {
        csy *= (d[1] - (that.currentY));
        cey *= (that.startY - (that.currentY));
      } else {
        cey *= (d[1] - (that.currentY));
        csy *= (that.startY - (that.currentY));
      }

      let selectedBins = _.filter(that.bins, bin =>
          bin['x'] >= csx && bin['x'] <= cex &&
          bin['y'] >= csy && bin['y'] <= cey);

      await that.$store.dispatch('updateSelected',
          {
            'evt': 'drag',
            'newState': true,
            'data': _.map(_.flatten(selectedBins), bin => bin[2])
          });
      await EventBus.$emit('updateHex');
      await EventBus.$emit('updateLabelComponent');
      await EventBus.$emit('initClusterComponent');
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
