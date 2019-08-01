<template lang="pug">
  .legend-item(@click="toggleLegendItem" v-bind:class="{ selectedLabel: selected }"
    :style='{border: selected ? `2px solid ${shadeColor(getCluster(this.$props.index - 1), -30)}` : "2px solid #fff", background: selected ? `${shadeColor(getCluster(this.$props.index - 1), 40)}11` : "#fff"}')
    .legend-cluster-wrapper
      .legend-cluster(:style='{border: `1px solid ${shadeColor(getCluster(this.$props.index - 1), -30)}`, background: `${shadeColor(getCluster(this.$props.index - 1), -20)}55`}')
</template>

<script>
import _ from 'lodash';
import { EventBus } from '../../utils/event-bus';
export default {
  name: 'LabelLegendComponent',
  props: {
    index: Number
  },
  data() {
    return {
      selected: false,
      clusters: this.$store.getters.getSelectedDistribution,
      colors: this.$store.getters.getColors,
    }
  },
  created() {
    let that = this;
    that.clusters = this.$store.getters.getSelectedDistribution;
    EventBus.$on('apply', async () => {
      await that.$store.dispatch('updateSelectedLabels');
      that.clusters = this.$store.getters.getSelectedDistribution;
      that.selected = false;
    });
    EventBus.$on('updateLabelComponent', async () => {
      await that.$store.dispatch('updateSelectedLabels');
      that.clusters = this.$store.getters.getSelectedDistribution;
      that.selected = false;
    })
  },
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    getCluster(idx) {
      let that = this;
      if(_.isNil(this.clusters[idx])) return '#FFFFFF';
      else return that.colors[that.clusters[idx].cluster]
    },
    getData(idx) {
      if(_.isNil(this.clusters[idx])) return '';
      else {
        let cluster = this.clusters[idx].cluster;
        return _.filter(this.$store.getters.getSelectedData, datum =>datum['clusterGroup'] === cluster && datum.selected).length
      }
    },
    getDist(idx) {
      if(_.isNil(this.clusters[idx])) return '';
      else return _.sumBy(this.clusters[idx].dist, 'value')
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
    async toggleLegendItem() {
      let that = this;
      await that.$store.dispatch('updateSelectedLabels', this.clusters[this.$props.index - 1].cluster);
      // update Label!
      // console.log(that.$store.getters.getSelectedLabels);
      that.selected = that.$store.getters.getSelectedLabels.includes(this.clusters[this.$props.index - 1].cluster);
      EventBus.$emit('renderLabel');
      EventBus.$emit('updateClusterComponent');
    }
  }
};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.legend-item
  width: 100%
  height: 33px
  margin-bottom: $unit-2
  padding-left: $unit-1
  border-radius: 6px
  box-sizing: border-box
  line-height: 29px
  display: flex
  .legend-cluster-wrapper
    width: 15px
    height: 100%
    padding: 7px 0
    margin-right: $unit-2
    .legend-cluster
      width: 100%
      height: 100%
      border-radius: $unit-1
  .legend-unit
    width: calc((100% - 21px - #{$unit-2})/2)
    height: 100%
</style>
