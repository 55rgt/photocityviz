<template lang="pug">
  .navigator-filter-container
    .navigator-header Settings
    .navigator-filter-item-container
      .navigator-filter-item-name Hexagon Radius
      .navigator-filter-item-input-wrapper
        input.navigator-filter-item-input(v-model="hexRadius")
    .navigator-filter-item-container
      .navigator-filter-item-name Sample
      .navigator-filter-item-input-wrapper
        input.navigator-filter-item-input(v-model="sampleProportion")
    .navigator-filter-item-container
      .navigator-filter-item-name Cohesion
      .navigator-filter-item-input-wrapper
        input.navigator-filter-item-input(v-model="cohesion")
    .navigator-filter-item-container
      .navigator-filter-item-name Month
      .navigator-filter-item-input-wrapper
        input.navigator-filter-item-input(v-model="MonthStartB")
      .navigator-filter-unit-space ~
      .navigator-filter-item-input-wrapper
        input.navigator-filter-item-input(v-model="MonthEndB")
</template>

<script>
const DEBOUNCE_TIME = 1000;
import _ from 'lodash'
import { mapActions } from 'vuex';
export default {
  name: 'Navigator-Settings',
  data() {
    return {
      cohesion: this.$store.getters.getCohesion,
      hexRadius: this.$store.getters.getHexRadius,
      sampleProportion: this.$store.getters.getSampleProportion,
      MonthStartA: this.$store.getters.getMonthStartA,
      MonthEndA: this.$store.getters.getMonthEndA,
      MonthStartB: this.$store.getters.getMonthStartB,
      MonthEndB: this.$store.getters.getMonthEndA
    }
  },
  watch: {
    // watch로 하면 비효율적이다.
    hexRadius: _.debounce(async function () {
      await this.$store.dispatch('updateFilter', { key: 'hexRadius', value: Number.parseInt(this.hexRadius) });
    }, DEBOUNCE_TIME),
    sampleProportion: _.debounce(async function () {
      await this.$store.dispatch('updateFilter', { key: 'sampleProportion', value: Number.parseInt(this.sampleProportion) });
    }, DEBOUNCE_TIME),
    MonthStartA: _.debounce(async function () {
      await this.$store.dispatch('updateFilter', { key: 'MonthStartA', value: Number.parseInt(this.MonthStartA) });
    }, DEBOUNCE_TIME),
    MonthEndA: _.debounce(async function () {
      await this.$store.dispatch('updateFilter', { key: 'MonthEndA', value: Number.parseInt(this.MonthEndA) });
    }, DEBOUNCE_TIME),
    MonthStartB: _.debounce(async function () {
      await this.$store.dispatch('updateFilter', { key: 'MonthStartB', value: Number.parseInt(this.MonthStartB) });
    }, DEBOUNCE_TIME),
    MonthEndB: _.debounce(async function () {
      await this.$store.dispatch('updateFilter', { key: 'MonthEndB', value: Number.parseInt(this.MonthEndB) });
    }, DEBOUNCE_TIME),
    cohesion: _.debounce(async function () {
      await this.$store.dispatch('updateFilter', { key: 'cohesion', value: Number.parseInt(this.cohesion) });
    }, DEBOUNCE_TIME)

  },
  mounted() {

  },
  methods: {
    ...mapActions(['updateFilter'])
  }
};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.navigator-filter-container
  width: 100%
  height: $navigator-settings-container-height
  padding: 0 $unit-3 $unit-3 $unit-3
  border-bottom: 1px solid #cbcbcb
  .navigator-header
    width: 100%
    @include setFonts('Roboto', $md-dark-text-secondary, $unit-4)
    @include setHeightAndLineHeight(40px)
  .navigator-filter-item-container
    width: 100%
    @include setHeightAndLineHeight(36px)
    font-weight: 500
    padding: 0 $unit-3
    display: flex
    .navigator-filter-item-name
      width: 172px
      height: 100%
      @include setFonts('Roboto', #686868, $unit-4)
    .navigator-filter-unit-space
      width: 20px
      text-align: center
      height: 100%
    .navigator-filter-item-input-wrapper
      width: 36px
      height: 100%
      display: flex
      align-items: center
      justify-content: center
      input.navigator-filter-item-input
        width: 100%
        height: 20px
        text-align: center
        box-sizing: content-box
        border-bottom: 2px solid #8f8f8f



.b
</style>
