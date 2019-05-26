<template lang="pug">
  .navigator-filter-container
    .navigator-header Show
    .navigator-filter-content
      .navigator-show-item-wrapper
        .navigator-show-item-name Countries
        .navigator-show-item-container
          .navigator-show-item-list
            .navigator-show-item(v-for="image in images" @click="toggleShowCountries(image.name)" v-bind:class="{ selected: showCountries.includes(image.name) }" :style="'background-image: url(' + image.url + ')'")
      .navigator-show-item-wrapper
        .navigator-show-item-name Clusters
        .navigator-show-item-container
          .navigator-show-item-list
            .navigator-show-item(v-for="n in 12" @click="toggleShowClusters(n)" v-bind:class="{ selected: showClusters.includes(n) }" :style="'background: ' + colors[n]")
    .navigator-header Highlight
    .navigator-filter-content
      .navigator-show-item-wrapper
        .navigator-show-item-name Countries
        .navigator-show-item-container
          .navigator-show-item-list
            .navigator-show-item(v-for="image in images" @click="toggleHighlightCountries(image.name)" v-bind:class="{ selected: highlightCountries.includes(image.name) }" :style="'background-image: url(' + image.url + ')'")
      .navigator-show-item-wrapper
        .navigator-show-item-name Clusters
        .navigator-show-item-container
          .navigator-show-item-list
            .navigator-show-item(v-for="n in 12" @click="toggleHighlightClusters(n)" v-bind:class="{ selected: highlightClusters.includes(n) }" :style="'background: ' + colors[n]")
    .navigator-apply-container
      .navigator-apply(@click="update()") Apply

</template>


<script>
import Egypt from '../../assets/flag/Egypt.png';
import Macao from '../../assets/flag/Macao.png';
import Mexico from '../../assets/flag/Mexico.png';
import Peru from '../../assets/flag/Peru.png';
import Spain from '../../assets/flag/Spain.png';
import Taiwan from '../../assets/flag/Taiwan.png';

import { mapActions } from 'vuex';
import _ from 'lodash';
import { EventBus } from '../../utils/event-bus';
export default {
  name: 'Navigator-Filter',
  data() {
    return {
      colors: this.$store.getters.getColors,
      images: [
        { url: Egypt, name: 'Egypt' },
        { url: Macao, name: 'Macao' },
        { url: Mexico, name: 'Mexico' },
        { url: Peru, name: 'Peru' },
        { url: Spain, name: 'Spain' },
        { url: Taiwan, name: 'Taiwan' },
      ],
      showCountries: this.$store.getters.getShowCountries,
      showClusters: this.$store.getters.getShowClusters,
      highlightCountries: this.$store.getters.getHighlightCountries,
      highlightClusters: this.$store.getters.getHighlightClusters,
    }
  },
  mounted() {
    let that = this;
  },
  methods: {
    async update() {
      let that = this;
      await that.$store.dispatch('updateFilteredData');
      EventBus.$emit('update');
      // store에 업데이트 해서 데이터 갈고, 메인이랑 서브에 이벤트버스로 호출시켜준다.
    },
    async toggleHighlightCountries(country) {
      let that = this;
      if(that.highlightCountries.includes(country)) that.highlightCountries = [];
      else {
        if(that.highlightCountries.length !== 0) that.highlightCountries = [];
        that.highlightCountries.push(country)
      }
      await that.$store.dispatch('updateFilter', { key: 'HighlightCountries', value: that.highlightCountries });
    },
    async toggleHighlightClusters(cluster) {
      let that = this;
      if(that.highlightClusters.includes(cluster)) that.highlightClusters = [];
      else {
        if(that.highlightClusters.length !== 0) that.highlightClusters = [];
        that.highlightClusters.push(cluster)
      }
      await that.$store.dispatch('updateFilter', { key: 'HighlightClusters', value: that.highlightClusters });
    },
    async toggleShowCountries(country) {
      let that = this;
      that.showCountries.includes(country) ?
          that.showCountries = _.without(that.showCountries, country):
          that.showCountries.push(country);
      await that.$store.dispatch('updateFilter', { key: 'ShowCountries', value: that.showCountries });
    },
    async toggleShowClusters(cluster) {
      let that = this;
      that.showClusters.includes(cluster) ?
          that.showClusters = _.without(that.showClusters, cluster):
          that.showClusters.push(cluster);
      await that.$store.dispatch('updateFilter', { key: 'ShowClusters', value: that.showClusters });
    }
  }
};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.navigator-filter-container
  width: 100%
  height: calc(100% - #{$navigator-settings-container-height} - #{$navigator-hexagon-container-height})
  padding: 0 $unit-3 $unit-3 $unit-3
  border-bottom: 1px solid #cbcbcb
  .navigator-header
    width: 100%
    @include setFonts('Roboto', $md-dark-text-secondary, $unit-4)
    @include setHeightAndLineHeight(40px)
  .navigator-filter-content
    width: 100%
    height: 64px
    .navigator-show-item-wrapper
      width: 100%
      height: 32px
      display: flex
      padding: 0 $unit-3
      .navigator-show-item-name
        width: 96px
        line-height: 32px
        height: 100%
        font-weight: 500
        @include setFonts('Roboto', #686868, $unit-4)
      .navigator-show-item-container
        flex: 1
        display: flex
        align-items: center
        justify-content: center
        .navigator-show-item-list
          width: 100%
          height: 24px
          display: flex
          .navigator-show-item
            flex: 1
            border: 1px solid #919191
            border-radius: 4px
            background-repeat: no-repeat
            opacity: 0.25
            background-size: 100% 100%
          .selected
            border: 1px solid #000000
            opacity: 1
  .navigator-apply-container
    width: 100%
    height: 36px
    margin-top: $unit-1
    .navigator-apply
      @include setFonts('Roboto', #686868, $unit-4)
      width: 100%
      line-height: 32px
      text-align: center
      height: 100%
      border: 1px solid #cbcbcb
      border-radius: $unit-4
      transition: 0.3s
      cursor: pointer
      &:hover
        background: rgba(0,0,0, 0.08)

.b
  border: 1px solid black

</style>
