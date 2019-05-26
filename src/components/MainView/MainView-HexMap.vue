<template lang="pug">
  .mainView-hexMap-container#hexMap
    .navigator-header Cluster HexMap: k-means_12
</template>


<script>
import * as d3 from 'd3';
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
      hexData: {},
      svgID: 'hexMapSVG',
      colors: this.$store.getters.getColors,
      selectedClusterData: this.$store.getters.selectedClusterData,
      filteredTSNE: this.$store.getters.getFilteredTSNE,
      filteredData: this.$store.getters.getFilteredData,
      highlightCountries: this.$store.getters.getHighlightCountries,
      highlightClusters: this.$store.getters.getHighlightClusters

    };
  },
  created() {
    let that = this;
    EventBus.$on('update', () => {
      console.log('on update');
      that.update();
    });
  },
  mounted() {
    let that = this;
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
      that.hexRadius = this.$store.getters.getHexRadius;
      that.selectedClusterData = this.$store.getters.getSelectedClusterData;
      that.filteredTSNE = this.$store.getters.getFilteredTSNE;
      that.filteredData = this.$store.getters.getFilteredData;
      that.highlightCountries = this.$store.getters.getHighlightCountries;
      that.highlightClusters = this.$store.getters.getHighlightClusters;
    },
    prepare() {
      let that = this;
      that.svg = d3.select('#hexMap')
          .append('svg')
          .attr('id', that.svgID)
          .attr('width', that.width)
          .attr('height', that.height);

      that.points = _.map(that.filteredTSNE, (d) => [d[that.axisX] * that.width / 12, d[that.axisY] * that.height / 12, d['name']]); // 이쪽 것도 radius에 맞게 조절 필요할
      that.hexbin = hexbin.hexbin().extent([[0, 0], [that.width, that.height]]).radius(that.hexRadius);
      that.bins = that.hexbin(that.points);

      that.hexData = _.reduce(that.bins, (result, data) => {
        let id = `hex_${Math.floor(data['x'])}_${Math.floor(data['y'])}`;
        result[id] = _.reduce(data, (result, datum) => {
          let name = datum[2];
          let cluster = that.selectedClusterData[name];
          _.isNil(result['names']) ? result['names'] = [name] : result['names'].push(name);
          result['number'] = result['names'].length;
          if (_.isNil(result['clusters'])) result['clusters'] = {};
          _.isNil(result['clusters'][cluster]) ? result['clusters'][cluster] = 1 : result['clusters'][cluster] += 1;
          return result;
        }, {});
        return result;
      }, {});
    },
    render() {
      let that = this;
      let zoom_layer = that.svg.append('g');
      let zoom = d3.zoom()
          .scaleExtent([SCALE_MIN, SCALE_MAX]) // SCALE_MIN , MAX도 반지름에 맞게 init에서  조절?
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
          .attr('stroke-width', Math.max(that.hexRadius / 20, 3)) // 얘도 그거에 따라 반지름에 따
          .attr('d', that.hexbin.hexagon())
          .attr('id', d => `hex_${Math.floor(d['x'])}_${Math.floor(d['y'])}`)
          .attr('transform', d => `translate(${d.x},${d.y})`)
          // .attr('fill-opacity', d => d.length / 30)
          // .attr('fill', '#ffffff')
          .attr('fill', d => `${that.setMainColor(`hex_${Math.floor(d['x'])}_${Math.floor(d['y'])}`)}`)
          .on('click', function (d) {
            console.log(this.id);
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
    determineHighlight(hcl_l, hco_l, maxCountries, maxClusters) {
      let that = this;
      if(hcl_l !== 0 && hco_l !== 0) {
        return maxCountries.includes(that.highlightCountries[0]) && maxClusters.includes(Number.parseInt(that.highlightClusters[0]));
      }
      if(hcl_l === 0 && hco_l !== 0){
        return maxCountries.includes(that.highlightCountries[0]);
      }
      if(hcl_l !== 0 && hco_l === 0){
        return maxClusters.includes(Number.parseInt(that.highlightClusters[0]));
      }
      else{
        return true;
      }
    },
    setMainColor(hexID) {
      let that = this;
      let uniqID = uuidv4();
      let hexDatum = that.hexData[hexID];

      let cl = _.chain(hexDatum['clusters']).toPairs().sortBy(1).reverse().value();
      let maxValue_cl = 0;
      let maxClusters = _.reduce(cl, (result, datum) => {
        if (maxValue_cl < datum[1]) maxValue_cl = datum[1];
        if (datum[1] === maxValue_cl) result.push(Number.parseInt(datum[0]));
        return result;
      }, []);
      let cob = {};
      _.forEach(hexDatum["names"], name => {
        let country = name.match(/_(.+)[.]jpg/)[1];
        _.isNil(cob[country]) ? cob[country] = 1 : cob[country] += 1;
      });
      let co = _.chain(cob).toPairs().sortBy(1).reverse().value();
      let maxValue_co = 0;
      let maxCountries = _.reduce(co, (result, datum) => {
        if (maxValue_co < datum[1]) maxValue_co = datum[1];
        if (datum[1] === maxValue_co) result.push(datum[0]);
        return result;
      }, []);
      if(that.determineHighlight(that.highlightClusters.length, that.highlightCountries.length, maxCountries, maxClusters)){
        let gradient = that.svg.append('defs')
            .append('radialGradient')
            .attr('id', uniqID)
            .attr('cx', '50%')
            .attr('cy', '50%')
            .attr('fx', '50%')
            .attr('fy', '50%')
            .attr('gradientTransform', `rotate(${that.getRandInt(0, 5) * 60}, 0.5, 0.5)`);

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
              // opacity scaling 필요. hexData에서 number 분포 보고 파악하기.
              .style('stop-opacity', 0.2 + datum.value / (that.hexRadius * that.hexRadius / 360));
          // opacity는 radius와 협력해서 해야할것 -> 각 육각형 내부 데이터 수 분포를 파악하고, 이를 특이한 그래프 가진 공
          prop += datum.value * datum.value * ratio;
          gradient.append('stop')
              .attr('offset', `${prop}%`)
              .style('stop-color', that.colors[Number.parseInt(datum.key)])
              .style('stop-opacity', 0.2 + datum.value / (that.hexRadius * that.hexRadius / 360));
        });
        return `url(#${uniqID})`;
      }
      else {
        return '#ffffff';
      }
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
