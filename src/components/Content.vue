<template lang="pug">
  .content-wrapper
    .filter-container.box-shadow
    MainViewComponent
    .subView-container.box-shadow
</template>

<script>
import MainViewComponent from './MainView/MainView-Component';
export default {
  name: 'Content',
  components: { MainViewComponent }
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
  .filter-container
    width: $filter-container-width
    height: 100%
    background: $md-white
    margin-right: $mainView-margin-right
  .subView-container
    width: calc(100% - #{$mainView-container-width} - #{$mainView-margin-right} - #{$filter-container-width} - #{$mainView-margin-right})
    height: 100%
    background: $md-white
</style>
