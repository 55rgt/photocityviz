<template lang="pug">
  .wrapper
    .header.box-shadow
      .header-title Photo City Visualization
      .header-sub Identifying the Color and the Theme of City.
    .content
      .mainView-container.box-shadow
        RankComponent
        ClusterComponent
      .subView-container.box-shadow
        UpSetComponent
        HeatMapComponent
        MetaComponent
</template>

<script>
import RankComponent from '../components/Rank/Rank-Component';
import ClusterComponent from '../components/ClusterComponent';
import UpSetComponent from '../components/UpSetComponent';
import HeatMapComponent from '../components/HeatMapComponent';
import MetaComponent from '../components/MetaComponent';
export default {
  name: 'Layout',
  components: { MetaComponent, HeatMapComponent, UpSetComponent, ClusterComponent, RankComponent }
};
</script>

<style scoped lang="sass">
@import "../style/_colors.sass"
@import "../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.wrapper
  width: 1920px
  height: 1080px
  background: $md-grey-200
  padding: $unit-2
  .header
    width: 100%
    @include setHeightAndLineHeight($header-height)
    display: flex
    background: $md-white
    padding: 0 $unit-3
    margin-bottom: $header-margin-bottom
    .header-title
      width: auto
      height: 100%
      margin-right: $unit-2
      @include setFonts('Roboto', $md-dark-text-primary, $unit-5)
    .header-sub
      width: auto
      height: 100%
      @include setFonts('Roboto', $md-dark-text-secondary, $unit-4)
  .content
    width: 100%
    height: calc(100% - #{$header-height} - #{$header-margin-bottom})
    display: flex
    .mainView-container
      width: $mainView-container-width
      height: 100%
      background: $md-white
      margin-right: $mainView-margin-right
    .subView-container
      width: calc(100% - #{$mainView-container-width} - #{$mainView-margin-right})
      height: 100%
      background: $md-white


.box-shadow
  -webkit-box-shadow: 0 3px 5px 1px $md-grey-400
  -moz-box-shadow: 0 3px 5px 1px $md-grey-400
  box-shadow: 0 3px 5px 1px $md-grey-400

/deep/ .component-header
  width: 100%
  @include setHeightAndLineHeight($component-header-height)
  @include setFonts('Roboto', $md-dark-text-primary, $unit-4)
  padding: 0 $unit-3

/deep/ .component-body
  width: 100%
  height: calc(100% - #{$component-header-height})
  @include b

/deep/ .flex
  display: flex
</style>


