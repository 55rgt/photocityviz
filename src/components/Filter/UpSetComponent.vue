<template lang="pug">
  .upset-container
    .upset-query-container
      .upset-query-legend-container
      .upset-query-list-container
    .upset-controller-container
      .upset-unselected-container
        .upset-unselected-filter-container
        .upset-unselected-list-container
      .upset-checkbox-container
        .upset-month-container
        .upset-country-container

</template>

<script>
export default {
  name: 'UpSetComponent'
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/styles"
.upset-container
  width: $upset-container-width
  height: 100%
  @include box_shadow
  background: $md-white
  display: flex
  overflow-x: auto
  flex-wrap: nowrap
  .upset-query-container
    width: auto
    height: 100%
    flex: 0 0 auto
    display: flex
    margin-right: $unit-3
    .upset-query-legend-container
      width: 60px
      height: 100%
      border: 1px solid black
    .upset-query-list-container
      width: auto
      height: 100%
  .upset-controller-container
    width: auto
    height: 100%
    flex: 0 0 auto
    .upset-unselected-container
      width: auto
      height: $upset-unselected-container-height
      display: flex
      .upset-unselected-filter-container
        width: 120px
        height: 100%
        border: 1px solid black
      .upset-unselected-list-container
        width: auto
        height: 100%
    .upset-checkbox-container
      width: auto
      height: $upset-checkbox-container-height
      display: flex
      .upset-month-container
        width: $upset-month-container-width
        height: 100%
        border: 1px solid black
      .upset-country-container
        border: 1px solid black
        width: $upset-country-container-width
        height: 100%


.b


</style>
