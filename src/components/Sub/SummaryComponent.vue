<template lang="pug">
  .summary-container
    .component-header Summary
    .component-body(v-if="ok")
      .summary-item
        .summary-item-title Number of Data:
        .summary-item-title-content {{ (summaryData['length'] === null) ? '' : numberWithCommas(summaryData['length']) }}
      .summary-item
        .summary-item-title Selected Clusters:
        .summary-item-cluster-content
          .summary-item-cluster-unit(v-for="color in summaryData.selectedClusters" :style="{border: `1px solid ${shadeColor(colorList[color], -30)}`, background: `${colorList[color]}`}")
      .summary-item
        .summary-item-title Top Colors:
        .summary-item-colors-content
          .summary-item-colors-unit(v-for="color in summaryData.colors" :style="{border: `1px solid ${shadeColor(colorPalette[color].hex, -30)}`, background: `${colorPalette[color].hex}`}")
      .summary-item-2
        .summary-item-2-title Top Labels:
        .summary-item-2-content
          .summary-item-2-unit(v-for="label in summaryData.labels") {{ label }}
      .summary-item-2
        .summary-item-2-title Top Hashtags:
        .summary-item-2-content
          .summary-item-2-unit(v-for="hashTag in summaryData.hashTags") {{ '#' + hashTag }}
</template>

<script>
import { EventBus } from '../../utils/event-bus';
import _ from 'lodash';

export default {
  name: 'SummaryComponent',
  data() {
    return {
      ok: false,
      test: ['hello', 'complimentary', 'hex', 'lotte', 'happy', 'hello', 'complimentary', 'hex', 'lotte', 'happy', 'hello', 'complimentary', 'hex', 'lotte', 'happy'],
      colorPalette: this.$store.getters.getColorPalette,
      colorList: this.$store.getters.getColors,
      summaryData: {
        selectedClusters: null,
        length: null,
        colors: [],
        labels: [],
        hashTags: [],
      }
    };
  },
  created() {
    let that = this;
    EventBus.$on('apply', () => {
          that.summaryData = {
            selectedClusters: null,
            length: null,
            colors: [],
            labels: [],
            hashTags: [],
          };
        }
    );
    EventBus.$on('updateClusterComponent', () => {
      that.ok = true;
      that.get();
    });
    EventBus.$on('initClusterComponent', () => {
          that.ok = false;
          console.log('summary init');
          that.summaryData = {
            selectedClusters: null,
            length: null,
            colors: [],
            labels: [],
            hashTags: []
          };
        }
    );

  },
  methods: {
    async get() {
      let that = this;
      await that.$store.dispatch('getSummaryData');
      that.summaryData = that.$store.getters.getSummaryData;
      console.log(that.summaryData);
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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

  }

};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.summary-container
  width: 100%
  height: 288px
  .component-body
    padding: 0 0 0 $unit-3
    .summary-item
      width: 100%
      height: 28px
      box-sizing: border-box
      padding-left: $unit-2
      font-weight: 500
      display: flex
      line-height: 28px
      @include setFonts('Roboto', #686868, $unit-3, 'sans-serif')

      .summary-item-title
        width: 140px
        height: 100%
        text-align: right
        padding-right: $unit-4
      .summary-item-cluster-content
        flex: 1
        padding: 6px 0
        display: flex

        .summary-item-cluster-unit
          width: 16px
          height: 16px
          border-radius: 2px
          margin-right: 4px

      .summary-item-title-content
        flex: 1

      .summary-item-colors-content
        flex: 1
        padding: 6px 0
        display: flex
        .summary-item-colors-unit
          width: 16px
          height: 16px
          margin-right: 4px
          border-radius: 2px
    .summary-item-2
      width: 100%
      height: 78px
      box-sizing: border-box
      padding-left: $unit-2
      font-weight: 500
      display: flex
      @include setFonts('Roboto', #686868, $unit-3, 'sans-serif')
      .summary-item-2-title
        width: 140px
        height: 100%
        line-height: 38px
        text-align: right
        padding-right: $unit-4
      .summary-item-2-content
        flex: 1
        padding-right: $unit-2
        display: flex
        flex-wrap: wrap
        overflow: hidden
        .summary-item-2-unit
          width: auto
          margin: 3px 5px 2px 0
          padding: 0 4px
          height: 33px
          line-height: 33px
          text-align: center
          background: #f4f4f4
          border: 1px solid #7c7c7c
          border-radius: 6px
          box-sizing: border-box
          @include setFonts('Roboto', #71655b, $unit-2, 'sans-serif')
          font-weight: 500
</style>
