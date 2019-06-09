<template lang="pug">
  .hexMap-container
    .component-header Distribution
    .component-body
      .hexMap#hexMap
</template>

<script>
import * as d3 from 'd3';
import * as hexbin from 'd3-hexbin';
import { EventBus } from '../../utils/event-bus';
import _ from 'lodash';
import uuidv4 from 'uuid/v4';

const SCALE_MIN = 1 / 20, SCALE_MAX = 3; // radius에 따라 변경?
export default {
  name: 'Hex_',
  data() {
    return {
      width: 924,
      height: 612,
      svg: null,
      hexDataset: null,
      axisX: 'x',
      axisY: 'y',
      hexData: {},
      colors: this.$store.getters.getColors,
      svgID: 'hexMapSVG',
      options: JSON.parse(JSON.stringify(this.$store.getters.getOption)),
      filteredData: JSON.parse(JSON.stringify(this.$store.getters.getFilteredData)),
      cohesion: null,
      hexRadius: null,
      minCluster: null,
      maxCluster: null,
      scale_min: null,
      scale_max: null,
    };
  },
  created() {
    let that = this;
    console.log('created Hook');
    EventBus.$on('update', () => {
      console.log('on update');
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
      that.filteredData = JSON.parse(JSON.stringify(this.$store.getters.getFilteredData)); // 얘도 마찬가지
      that.cohesion = that.options.cohesion;
      that.hexRadius = that.options.hexRadius;
      that.minCluster = null;
      that.maxCluster = null;
    },
    prepare() {
      let that = this;
      that.svg = d3.select('#hexMap')
          .append('svg')
          .attr('id', that.svgID)
          .attr('width', that.width)
          .attr('height', that.height);

      that.points = _.map(that.filteredData, (d) => [d[that.axisX] * that.width / that.cohesion, d[that.axisY] * that.height / that.cohesion, d['name'], d['clusterGroup'], d['selected']]); // 이쪽 것도 radius에 맞게 조절 필요할
      that.hexbin = hexbin.hexbin().extent([[0, 0], [that.width, that.height]]).radius(that.hexRadius);
      that.bins = that.hexbin(that.points);

      let min = d3.min(that.bins, d => d.length);
      let max = d3.max(that.bins, d => d.length);

      // that.r = d3.scaleSqrt()
      //     .domain([min, max])
      //     .range([that.hexbin.radius() * Math.SQRT2, that.hexbin.radius() * Math.SQRT2]);

      that.r = d3.scaleSqrt()
          .domain([min, 50])
          .range([Math.min(0.5, Math.pow(min / max , 0.3)) * that.hexbin.radius() * Math.SQRT2, Math.min(2.25, Math.sqrt(max / min)) * that.hexbin.radius() * Math.SQRT2]);

      // that.r = d3.scaleLinear()
      //     .domain([1, that.hexRadius])
      //     .range([that.hexbin.radius() * Math.SQRT2, 2 * that.hexbin.radius() * Math.SQRT2]);

      // 스케일링을 minmax로 하는 게 아니라, general하게 해야 함. 그래야 국가 변경 시 문제가 없다.

      that.hexData = _.reduce(that.bins, (result, data) => {
        let id = `hex_${Math.floor(data['x'])}_${Math.floor(data['y'])}`;
        result[id] = _.reduce(data, (result, datum) => {
          let name = datum[2];
          let cluster = datum[3];
          let selected = datum[4];
          result['names'].push(name);
          result['number'] = result['names'].length;
          _.isNil(result['clusters'][cluster]) ? result['clusters'][cluster] = 1 : result['clusters'][cluster] += 1;
          if (selected === 'true') result['selected'] = true;
          return result;
        }, {
          selected: false,
          names: [],
          clusters: {}
        });
        // if(result[id]['selected']) _.forEach(Object.keys(result[id]['clusters']), (cK) => {
        //   let value = result[id]['clusters'][cK];
        //   if(_.isNil(that.minCluster) || that.minCluster > value) that.minCluster = value;
        //   if(_.isNil(that.maxCluster) || that.maxCluster < value) that.maxCluster = value;
        // });
        return result;
      }, {});
      // console.log(that.minCluster, that.maxCluster);
      that.scale_min = 1 / 20;
      that.scale_max = 3;

    },
    render() {

      let that = this;
      let zoom_layer = that.svg.append('g');
      let zoom = d3.zoom()
          .scaleExtent([that.scale_min, that.scale_max]) // SCALE_MIN , MAX도 반지름에 맞게 init에서  조절?
          .on('zoom', () => {
            zoom_layer.attr('transform', d3.event.transform);
          });
      that.svg.call(zoom);
      that.svg.call(zoom.transform, d3.zoomIdentity.translate(that.width / 2, that.height / 2).scale(that.scale_min));

      zoom_layer
          .selectAll('path')
          .data(that.bins)
          .join('path')
          .attr('stroke', '#000')
          .attr('stroke-opacity', 0.8)
          .attr('stroke-width', 2) // 얘도 그거에 따라 반지름에 따
          .attr('d', d => that.hexbin.hexagon(that.r(d.length)))
          // .attr('d', that.hexbin.hexagon())
          // ㅇㅕ기다가 transform => scale
          .attr('id', d => `hex_${Math.floor(d['x'])}_${Math.floor(d['y'])}`)
          .attr('transform', d => `translate(${d.x},${d.y})`)
          .attr('fill', d => `${that.setMainColor(`hex_${Math.floor(d['x'])}_${Math.floor(d['y'])}`)}`)
          .on('click', function (d) {
            console.log(that.hexData[this.id]);
          });
    },
    getRandInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    refineClusterForRender(data, total, ratio) {
      let list = [];
      for (let key of Object.keys(data)) {
        list.push({
          key: key,
          value: data[key]
        });
      }
      let prop = 0;
      list = _.orderBy(list, ['value', 'key'], ['desc', 'asc']);
      return _.reduce(list, (r, e) => {

        if (prop >= ratio) return r;
        prop += e.value / total;
        r[e.key] = e.value;
        return r;
      }, {});
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
    setMainColor(hexID) {
      let that = this;
      let uniqID = uuidv4();
      let hexDatum = that.hexData[hexID];
      if (hexDatum.selected) {
        let gradient = that.svg.append('defs')
            .append('radialGradient')
            .attr('id', uniqID)
            .attr('cx', '50%')
            .attr('cy', '50%')
            .attr('fx', '50%')
            .attr('fy', '50%');
        let number = hexDatum['number'];
        let hexDatumClusters = that.refineClusterForRender(hexDatum['clusters'], number, 1);
        let list = [];
        for (let key of Object.keys(hexDatumClusters)) {
          list.push({
            key: key,
            value: hexDatumClusters[key]
          });
        }
        list = _.orderBy(list, ['value', 'key'], ['desc', 'asc']);
        let ratio = 100 / _.reduce(hexDatumClusters, (result, value) => result + value * value, 0);
        let prop = null;
        _.forEach(list, (datum) => {
          if (_.isNil(prop)) prop = 0;
          gradient.append('stop')
              .attr('offset', `${prop}%`)
              .style('stop-color', that.shadeColor(that.colors[Number.parseInt(datum.key)], 0))
              .style('stop-opacity', 0.5);
          prop += datum.value * datum.value * ratio;
          gradient.append('stop')
              .attr('offset', `${prop}%`)
              .style('stop-color',that.shadeColor(that.colors[Number.parseInt(datum.key)], 0))
              .style('stop-opacity', 0.5);
          // .style('stop-opacity', MIN_OPACITY + (1-MIN_OPACITY)*(that.minCluster / that.maxCluster) * datum.value);
        });
        return `url(#${uniqID})`;
      } else {
        return '#ffffff';
      }
    },
  }
};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.hexMap-container
  width: 100%
  height: $labels-container-height
  background: $md-white
  @include box_shadow
  margin-bottom: $unit-2

  .component-body
    .hexMap
      width: 100%
      height: 100%
      padding-bottom: $unit-3
</style>
