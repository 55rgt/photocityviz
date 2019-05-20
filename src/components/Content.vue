<template lang="pug">
  .content-wrapper
    FilterComponent
    MainViewComponent
    .subView-container.box-shadow
</template>

<script>
import MainViewComponent from './MainView/MainView-Component';
import FilterComponent from './Filter/Filter-Component';
export default {
  name: 'Content',
  components: { FilterComponent, MainViewComponent }
};
</script>

<style scoped lang="sass">
@import "../style/_colors.sass"
@import "../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.content-wrapper
  width: 100%
  height: calc(100% - #{$header-height} - #{$header-margin-bottom} - #{$clusterRanking-wrapper-height} - #{$header-margin-bottom})
  display: flex
  .subView-container
    width: calc(100% - #{$mainView-container-width} - #{$mainView-margin-right} - #{$filter-container-width} - #{$mainView-margin-right})
    height: 100%
    background: $md-white
</style>
