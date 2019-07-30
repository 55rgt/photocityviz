<template lang="pug">
  .hexMap#hexMap
</template>

<script>
import * as d3 from 'd3';
import * as hexbin from 'd3-hexbin';
import { EventBus } from '../../utils/event-bus';
import _ from 'lodash';

export default {
  name: 'testComponent',
  data() {
    return {
      width: 1004,
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
      r: null,
      isDown: false,
      currentScale: null
    };
  },
  created() {
    let that = this;

  },
  methods: {
    update(state) {
      this.remove();
      this.init(state);
      this.prepare();
      this.render();
    },
    remove() {
      let that = this;
      d3.select(`#${that.svgID}`).remove();
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
      that.currentScale = state ? 1 / 21 : that.currentScale;
      that.currentX = null;
      that.currentY = null;

    },
    prepare() {
      let that = this;
      that.hexbin = hexbin.hexbin().extent([[0, 0], [that.width, that.height]]).radius(that.hexRadius);
      let dataGroup = _.groupBy(that.selectedData, d => d['clusterGroup']);

      let arr = _.flatten(_.map(dataGroup));
      console.log(_.minBy(arr, (e) => e.x).x);
      console.log(_.minBy(arr, (e) => e.y).y);
      console.log(_.maxBy(arr, (e) => e.x).x);
      console.log(_.maxBy(arr, (e) => e.y).y);

      // 최소x: -100 최대x: 90
      // 최대y: -87.3 최대y: 90.6


      /*
       1. 각 점들 정규화시켜서 변경
       2. hex를 만드는데, 얘들은 임의의 애들임.
       3. 반지름은 미리 정해놔야 함 수식으로.
       4. hex 속성 다 가지고 있는 node 생성
       5. node를 force-collision 이용해서 위치 새로 잡기
       6. 새로 잡은 위치는 hex에 업데이트
       7. 렌더링

       */


      _.forEach(dataGroup, (value, key) => {
        let points = _.map(value, (d) => [d[that.axisX] * that.width / that.cohesion, d[that.axisY] * that.height / that.cohesion, d['name'], d['selected']]); // 이쪽 것도 radius에 맞게 조절 필요할
        //  포인트 다시.
        let bin = _.map(that.hexbin(points), hex => {
          hex['cluster'] = Number.parseInt(key);
          hex['selected'] = _.map(hex, h => h[3]).includes(true);
          return hex;
        });
        that.bins.push(bin);
      });
      console.log(that.bins); // [0] => x [1] => y이다 length로 r을 만든다. //

      let flatten = _.flatten(that.bins);
      that.bins = _.orderBy(flatten, ['length'], ['desc']);
      let min = d3.min(that.bins, d => d.length);
      let max = d3.max(that.bins, d => d.length);

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

      that.svg.call(that.zoom.transform, d3.zoomIdentity.translate(that.width / 2, that.height / 2).scale(that.currentScale));

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
          .on('click', async d => {
            await that.$store.dispatch('updateSelected',
                {
                  'evt': 'click',
                  'newState': !d.selected,
                  'data': _.map(d, a => a[2])
                });
            await EventBus.$emit('updateHex');
            await EventBus.$emit('updateLabelComponent');
            await EventBus.$emit('initClusterComponent');
          })
          .attr('stroke', d => `${that.shadeColor(that.colors[Number.parseInt(d['cluster'])], -50)}`)
          .attr('stroke-width', d => d.selected ? that.hexRadius / 4 : Math.max(that.hexRadius / 16, 2))
          .attr('stroke-opacity', 0.8)
          .attr('d', d => that.hexbin.hexagon(that.r(d.length)))
          .attr('id', d => `hex_${Math.floor(d['x'])}_${Math.floor(d['y'])}_${d['cluster']}`)
          .attr('transform', d => `translate(${d.x},${d.y})`)
          .attr('fill', d => `${that.shadeColor(that.colors[Number.parseInt(d['cluster'])], 0)}`)
          .attr('fill-opacity', d => d.selected ? 0.6 : 0.05);

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
