<template lang="pug">
  .nav-container
    NavClusterComponent
    NavSettingComponent
    NavFilterComponent
    NavQueryComponent
    .nav-apply-container(@click="triggerApply")
      .nav-apply Apply
</template>

<script>
import NavClusterComponent from './NavClusterComponent';
import NavFilterComponent from './NavFilterComponent';
import NavQueryComponent from './NavQueryComponent';
import NavSettingComponent from './NavSettingComponent';
import { EventBus } from '../../utils/event-bus';
import _ from 'lodash';
export default {
  name: 'NavComponent',
  components: { NavSettingComponent, NavQueryComponent, NavFilterComponent, NavClusterComponent },
  methods: {
    triggerApply: _.debounce(function() {
      console.log('trigger');
      this.apply();
    }, 500),
    async apply() {
      let that = this;
      await that.$store.dispatch('updateFilteredData'); // for HexComponent
      await that.$store.dispatch('updateSelected');
      await EventBus.$emit('apply');
    }
  }
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/styles"
.nav-container
  width: $nav-container-width
  height: 100%
  background: $md-white
  @include box_shadow
  margin-right: $unit-2
  .nav-apply-container
    width: 100%
    height: $nav-apply-height
    padding: $unit-2
    .nav-apply
      width: 100%
      height: 100%
      line-height: 34px
      text-align: center
      @include setFonts('Roboto', $md-dark-text-secondary, $unit-3, 'sans-serif')
      border: 1px solid #ababab
      border-radius: $unit-6
      cursor: pointer
      transition: border, background 0.2s
      &:hover
        border: 1px solid #dedede
        background: $md-grey-200
</style>
