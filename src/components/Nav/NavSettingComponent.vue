<template lang="pug">
  .nav-setting-container
    .component-header Settings
    .component-body
      .nav-setting-item-container
        .nav-setting-item-title Radius
        .nav-setting-item-body
          .nav-setting-input-wrapper
            input.nav-setting-input(v-model="option.hexRadius")
      .nav-setting-item-container
        .nav-setting-item-title Cohesion
        .nav-setting-item-body
          .nav-setting-input-wrapper
            input.nav-setting-input(v-model="option.cohesion")
</template>

<script>
const DEBOUNCE_TIME = 500;
import _ from 'lodash';
export default {
  name: 'NavSettingComponent',
  data() {
    return {
      option: JSON.parse(JSON.stringify(this.$store.getters.getOption))
    }
  },
  watch: {
    'option.hexRadius': _.debounce(async function() {
      let value = Number.parseInt(this.option.hexRadius);
      if(!_.isNil(value) && !_.isNaN(value)) await this.$store.dispatch('updateOptions', { key: 'hexRadius', value });
    }, DEBOUNCE_TIME),
    'option.cohesion': _.debounce(async function() {
      let value = Number.parseInt(this.option.cohesion);
      if(!_.isNil(value) && !_.isNaN(value)) await this.$store.dispatch('updateOptions', { key: 'cohesion', value });
    }, DEBOUNCE_TIME),
  }
};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.nav-setting-container
  width: 100%
  height: $nav-setting-height
  .component-body
    .nav-setting-item-container
      width: 100%
      height: 50%
      padding: 0 0 0 $unit-3
      display: flex
      font-weight: 500
      .nav-setting-item-title
        width: 66px
        height: 100%
        line-height: 36px
        text-align: right
        padding-right: $unit-3
        @include setFonts('Roboto', #686868, $unit-3, 'sans-serif')
      .nav-setting-item-body
        flex: 1
        .nav-setting-input-wrapper
          width: 28px
          height: 100%
          padding: $unit-2 0
          .nav-setting-input
            width: 100%
            height: 100%
            outline: none
            text-align: center
            @include setFonts('Roboto', #4e4e4e, $unit-2, 'sans-serif')
            border: 1px solid #8f8f8f
            border-radius: $unit-1

</style>
