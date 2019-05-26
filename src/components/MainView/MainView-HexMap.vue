<template lang="pug">
  .mainView-hexMap-container(@click="doSth()")#hexMap
    .navigator-header Cluster HexMap: Cluster#1
</template>


<script>
import * as d3 from 'd3';
import TSNEData from '../../../public/data/TSNE_final';
import clusterData from '../../../public/data/kmeans_12_tsvd_final';
import * as hexbin from 'd3-hexbin';
import { EventBus } from '../../utils/event-bus';
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
      hexRadius: this.$store.getters.getHexRadius,
      sampleProportion: this.$store.getters.getSampleProportion,
      hexData: {},
      svgID: 'hexMapSVG',
      colors: this.$store.getters.getColors,

    };
  },
  created() {
    let that = this;
    EventBus.$on('update', () => {
      that.update()
    });
  },
  mounted() {
    let that = this;

    that.svg = d3.select('#hexMap')
        .append('svg')
        .attr('id', that.svgID)
        .attr('width', that.width)
        .attr('height', that.height);

    that.points = _.map(TSNEData, (d) => [d[that.axisX] * that.width / 12, d[that.axisY] * that.height / 12, d['name']]);
    that.hexbin = hexbin.hexbin().extent([[0, 0], [that.width, that.height]]).radius(that.hexRadius);

    that.bins = that.hexbin(that.points);
    /* make Hexagon Data */
    that.hexData = _.reduce(that.bins, (result, data, idx) => {
      let id = `hex_${Math.floor(data['x'])}_${Math.floor(data['y'])}`;
      result[id] = _.reduce(data, (result, datum) => {
        let name = datum[2];
        let cluster = clusterData[name];
        if (idx <= 1) console.log(cluster);
        _.isNil(result['names']) ? result['names'] = [name] : result['names'].push(name);
        result['number'] = result['names'].length;
        if (_.isNil(result['clusters'])) result['clusters'] = {};
        _.isNil(result['clusters'][cluster]) ? result['clusters'][cluster] = 1 : result['clusters'][cluster] += 1;
        return result;
      }, {});
      return result;
    }, {});

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
        .attr('stroke', '#000')
        .attr('stroke-opacity', 0.8)
        .attr('stroke-width', 5) // 얘도 그거에 따라 반지름에 따
        .attr('d', that.hexbin.hexagon())
        .attr('id', d => `hex_${Math.floor(d['x'])}_${Math.floor(d['y'])}`)
        .attr('transform', d => `translate(${d.x},${d.y})`)
        // .attr('fill-opacity', d => d.length / 30)
        .attr('fill', d => `${that.setMainColor(`hex_${Math.floor(d['x'])}_${Math.floor(d['y'])}`)}`)
        .on('click', function (d) {
          console.log(this.id);
        });

  },
  methods: {
    doSth() {
      this.remove();
    },
    update() {
      this.remove();
      this.prepare();
      this.render();
    },
    remove() {
      let that = this;
      console.log('remove');
      d3.select(`#${that.svgID}`).remove();
    },
    prepare() {

    },
    render() {

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
    setMainColor(hexID) {
      let that = this;
      let uniqID = uuidv4();
      let gradient = that.svg.append('defs')
          .append('radialGradient')
          .attr('id', uniqID)
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
  position: relative

  /deep/ svg
    background-color: #ffffff

    /deep/ g
      overflow: scroll

  .navigator-header
    position: absolute
    top: $unit-3
    left: $unit-3
    @include setFonts('Roboto', $md-dark-text-secondary, $unit-4)

</style>
