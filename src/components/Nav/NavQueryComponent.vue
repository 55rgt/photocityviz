<template lang="pug">
  .nav-query-container
    .component-header Query
    .component-body
      .nav-query-header
        .nav-query-header-label label
        .nav-query-header-radio(v-for="state in query_state") {{ state }}
      .nav-query-content
        NavQueryItemComponent(v-for="label in Object.keys(labelCount)" :labelMap="{key: label, value: labelCount[label]}" :selectedState="'none'")

</template>

<script>
import NavQueryItemComponent from './NavQueryItemComponent';
export default {
  name: 'NavQueryComponent',
  components: { NavQueryItemComponent },
  data() {
    return {
      query_state:['none', 'maybe', 'must', 'not'],
      labelCount: JSON.parse(JSON.stringify(this.$store.getters.getLabelCount))
    }
  }
};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.nav-query-container
  width: 100%
  height: $nav-query-height
  .component-body
    .nav-query-header
      width: 100%
      height: 24px
      padding: 0 $unit-3
      display: flex
      font-weight: 500
      .nav-query-header-label
        width: 66px
        height: 100%
        line-height: 24px
        text-align: right
        padding-right: $unit-3
        @include setFonts('Roboto', #686868, $unit-3, 'sans-serif')
      .nav-query-header-radio
        width: 40px
        height: 100%
        line-height: 24px
        text-align: center
        @include setFonts('Roboto', #686868, $unit-3, 'sans-serif')
    .nav-query-content
      width: 100%
      height: calc(100% - 24px)
      overflow: scroll
    .nav-query-content::-webkit-scrollbar
      display: none
      width: 0
      background: transparent
.b
</style>
