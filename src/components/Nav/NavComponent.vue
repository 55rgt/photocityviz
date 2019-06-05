<template lang="pug">
  .nav-container
    NavClusterComponent
    NavSettingComponent
    NavFilterComponent
    NavQueryComponent
    .nav-apply-container(@click="apply")
      .nav-apply Apply
</template>

<script>
import NavClusterComponent from './NavClusterComponent';
import NavFilterComponent from './NavFilterComponent';
import NavQueryComponent from './NavQueryComponent';
import NavSettingComponent from './NavSettingComponent';
export default {
  name: 'NavComponent',
  components: { NavSettingComponent, NavQueryComponent, NavFilterComponent, NavClusterComponent },
  methods: {
    apply() {
      console.log(this.$store.getters.getOption);
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
      line-height: 44px
      text-align: center
      @include setFonts('Roboto', $md-dark-text-secondary, $unit-4, 'sans-serif')
      border: 2px solid black
      border-radius: $unit-6
      cursor: pointer
</style>
