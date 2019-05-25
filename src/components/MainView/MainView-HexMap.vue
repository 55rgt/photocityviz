<template lang="pug">
  .mainView-hexMap-container#hexMap
</template>


<script>
import * as d3 from 'd3';
import testData from '../../../public/data/tsne_sub_refined';
import clusterData from '../../../public/data/kmeans_tSVD_refined';
import * as hexbin from 'd3-hexbin';
import { EventBus } from '../../utils/event-bus'
import _ from 'lodash';
import uuidv4 from 'uuid/v4';

const SCALE_MIN = 1 / 20, SCALE_MAX = 3;

export default {
  name: 'MainView-HexMap',
  data() {
    return {
      width: 880,
      height: 808,
      svg: null,
      hexDataset: null,
      axisX: 'x',
      axisY: 'y',
      hexRadius: 90,
      hexData: {},
      white: true,
    }
  },
  created() {
    let that = this;
    EventBus.$on('updateRender', () => that.do());
  },
  mounted() {

    let that = this;
    that.colors = [null, '#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabebe', '#469990', '#e6beff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9', '#ffffff', '#000000'];
    that.svg = d3.select('#hexMap')
        .append('svg')
        .attr('width', that.width)
        .attr('height', that.height);

    that.points = _.map(testData, (d) => [d[that.axisX] * that.width / 6, d[that.axisY] * that.height / 6, d['name']]);
    that.hexbin = hexbin.hexbin().extent([[0, 0], [that.width, that.height]]).radius(that.hexRadius);

    that.bins = that.hexbin(that.points);
    /* make Hexagon Data */
    that.hexData = _.reduce(that.bins, (result, data) => {
      let id = `hex_${Math.floor(data['x'])}_${Math.floor(data['y'])}`;
      result[id] = _.reduce(data, (result, datum) => {
        let name = datum[2];
        let cluster = clusterData[name];
        _.isNil(result['names']) ? result['names'] = [name] : result['names'].push(name);
        result['number'] = result['names'].length;
        if (_.isNil(result['clusters'])) result['clusters'] = {};
        _.isNil(result['clusters'][cluster]) ? result['clusters'][cluster] = 1 : result['clusters'][cluster] += 1;
        return result;
      }, {});
      return result;
    }, {});
    console.log(Object.keys(that.hexData).length);

    let zoom_layer = that.svg.append('g');
    let zoom = d3.zoom()
        .scaleExtent([SCALE_MIN, SCALE_MAX])
        .on('zoom', () => {
          zoom_layer.attr('transform', d3.event.transform);
        });
    that.svg.call(zoom);
    that.svg.call(zoom.transform, d3.zoomIdentity.translate(that.width / 2, that.height / 2).scale(SCALE_MIN));

    zoom_layer
        .selectAll('path')
        .data(that.bins)
        .join('path')
        // .attr('stroke', d =>`${that.setMainStroke(`hex_${Math.floor(d['x'])}_${Math.floor(d['y'])}`)}`)
        .attr('stroke', '#000')
        .attr('stroke-opacity', 0.8)
        .attr('stroke-width', 1)
        .attr('d', that.hexbin.hexagon())
        .attr('id', d => `hex_${Math.floor(d['x'])}_${Math.floor(d['y'])}`)
        .attr('transform', d => `translate(${d.x},${d.y})`)
        // .attr('fill-opacity', d => d.length / 30)
        .attr('fill', d => `${that.setMainColor(`hex_${Math.floor(d['x'])}_${Math.floor(d['y'])}`)}`)
        .on('click', function (d) {
          console.log(this.id);
          // console.log(this);
          // let a = d3.select(this).attr('isSelected');
          // console.log(typeof a);
          // console.log(state);
          // d3.select(this).attr('isSelected', !state);
          // console.log(this);
          // state on - off 조정하고, trigger 이벤트 써서 debounce로 여러 개 선택해서 해당 정보 넣을 수도 있다.
          // 그리고 선택된 애들은 border를 진하게 하는 등의 ..
          // 이거 이렇게 하지 말고, data update로 하자
        });

  },
  methods: {
    do() {
      console.log('do it')
    },
    testSth() {
      let that = this;
      that.white = !that.white;
      that.svg.style('background', that.white ? 'white' : 'black');
      d3.selectAll('path').style('stroke', that.white ? 'black' : 'white');
      d3.selectAll('path').style('stroke-width', that.white ? 2 : 0)
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
      // 1. sort data by value
      // 2.
      let prop = 0;
      list = _.orderBy(list, ['value', 'key'], ['desc', 'asc']);
      return _.reduce(list, (r, e) => {

        if (prop >= ratio) return r;
        prop += e.value / total;
        r[e.key] = e.value;
        return r;
      }, {});
    },
    setMainStroke(hexID) {
      let that = this;
      let datum = that.hexData[hexID];
      let max = 0, maxKey = null;
      _.forEach(datum['cluster'], (value, key) => {
        if(max < value) {
          max = value;
          maxKey = key;
        }
      });
      return that.colors[Number.parseInt(maxKey)];
    },
    setMainColor(hexID) {
      let that = this;
      let uniqID = uuidv4();
      let gradient = that.svg.append('defs')
      // .append('linearGradient')
          .append('radialGradient')
          .attr('id', uniqID)
          // .attr('x1', '0%')
          // .attr('x2', '0%')
          // .attr('y1', '0%')
          // .attr('y2', '100%')
          .attr('cx', '50%')
          .attr('cy', '50%')
          .attr('fx', '50%')
          .attr('fy', '50%')
          .attr('gradientTransform', `rotate(${that.getRandInt(0, 5) * 60}, 0.5, 0.5)`);
      let hexDatum = that.hexData[hexID];
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
            .style('stop-color', that.colors[Number.parseInt(datum.key)])
            .style('stop-opacity', 0.5 + (datum.value / that.hexRadius) * 0.9);
        // opacity는 radius와 협력해서 해야할것 -> 각 육각형 내부 데이터 수 분포를 파악하고, 이를 특이한 그래프 가진 공
        prop += datum.value * datum.value * ratio;
        gradient.append('stop')
            .attr('offset', `${prop}%`)
            .style('stop-color', that.colors[Number.parseInt(datum.key)])
            .style('stop-opacity', 0.5 + (datum.value / that.hexRadius) * 0.9);
      });
      return `url(#${uniqID})`;
    }
  }
};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.mainView-hexMap-container
  width: 100%
  height: 100%
  /deep/ svg
    background-color: #ffffff
    /deep/ g
      overflow: scroll
</style>
