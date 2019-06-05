<template lang="pug">
  .nav-filter-container
    .component-header Filter
    .component-body
      .nav-filter-item-container
        .nav-filter-item-title Countries
        .nav-filter-item-body
          .nav-filter-country-list
            .nav-filter-country(v-for="flag in countryFlags" @click="toggleCountries(flag.name)" v-bind:class="{ selected: countries.includes(flag.name) }" :style='{backgroundImage: "url(" + flag.url + ")"}')
      .nav-filter-item-container
        .nav-filter-item-title Month
        .nav-filter-item-body
          .nav-filter-month-input-wrapper
            input.nav-filter-month-input(v-model="start")
          .nav-filter-space ~
          .nav-filter-month-input-wrapper
            input.nav-filter-month-input(v-model="end")
</template>

<script>
const DEBOUNCE_TIME = 500;
import _ from 'lodash';
export default {
  name: 'NavFilterComponent',
  data() {
    return {
      countryFlags: this.$store.getters.getCountryFlags,
      countries: this.$store.getters.getOptionCountries,
      start: this.$store.getters.getOptionStart,
      end: this.$store.getters.getOptionEnd,
    }
  },
  watch: {
    start: _.debounce(async function() {
      let value = Number.parseInt(this.start);
      if(!_.isNil(value) && !_.isNaN(value) && value <= this.end && value >= 1) await this.$store.dispatch('updateOptions', { key: 'start', value });
    }, DEBOUNCE_TIME),
    end: _.debounce(async function() {
      let value = Number.parseInt(this.end);
      if(!_.isNil(value) && !_.isNaN(value) && value >= this.start && value <= 12) await this.$store.dispatch('updateOptions', { key: 'end', value });
    }, DEBOUNCE_TIME),
  },
  methods: {
    async toggleCountries(country) {
      let that = this;
      that.countries.includes(country) ?
          that.countries = _.without(that.countries, country):
          that.countries.push(country);
      await that.$store.dispatch('updateOptions', { key: 'countries', value: that.countries });
    }

  }
};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.nav-filter-container
  width: 100%
  height: $nav-filter-height
  .component-body
    .nav-filter-item-container
      width: 100%
      height: 50%
      padding: 0 0 0 $unit-3
      display: flex
      font-weight: 500
      .nav-filter-item-title
        width: 66px
        height: 100%
        line-height: 36px
        text-align: right
        padding-right: $unit-3
        @include setFonts('Roboto', #686868, $unit-3, 'sans-serif')
      .nav-filter-item-body
        flex: 1
        display: flex
        .nav-filter-country-list
          width: 100%
          height: 100%
          padding: 7px 0
          display: flex
          .nav-filter-country
            width: 28px
            margin-right: 1px
            border: 1px solid #919191
            border-radius: $unit-1
            background-repeat: no-repeat
            opacity: 0.3
            background-size: 103% 100%
            cursor: pointer
            transition: opacity 0.15s
            &:hover
              opacity: 0.4
          .selected
            border: 1px solid #000000
            opacity: 0.9
            &:hover
              opacity: 1
        .nav-filter-space
          width: 16px
          line-height: 36px
          height: 100%
          text-align: center
          @include setFonts('Roboto', #4e4e4e, $unit-3, 'sans-serif')
        .nav-filter-month-input-wrapper
          width: 28px
          height: 100%
          padding: $unit-2 0
          .nav-filter-month-input
            width: 100%
            height: 100%
            outline: none
            text-align: center
            @include setFonts('Roboto', #4e4e4e, $unit-2, 'sans-serif')
            border: 1px solid #8f8f8f
            border-radius: $unit-1
.d
</style>
