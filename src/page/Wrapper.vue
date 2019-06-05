<template lang="pug">
  .wrapper
    .header
      .header-title Photo City Visualization
      .header-sub Identifying the Theme of City.
    .content
      NavComponent
      MainComponent
      SubComponent


</template>

<script>
import NavComponent from '../components/Nav/NavComponent';
import MainComponent from '../components/Main/MainComponent';
import SubComponent from '../components/Sub/SubComponent';

export default {
  name: 'Wrapper',
  components: { SubComponent, MainComponent, NavComponent }
};
</script>

<style scoped lang="sass">
@import "../style/colors"
@import "../style/styles"
.wrapper
  width: 1920px
  height: 1080px
  background: $md-grey-200
  padding: $unit-2

  .header
    width: 100%
    @include box_shadow
    @include setHeightAndLineHeight($header-height)
    display: flex
    background: $md-white
    padding: 0 $unit-3
    margin-bottom: $header-margin-bottom

    .header-title
      width: auto
      height: 100%
      margin-right: $unit-2
      @include setFonts('Roboto', $md-dark-text-primary, $unit-5, 'sans-serif')

    .header-sub
      width: auto
      height: 100%
      @include setFonts('Roboto', $md-dark-text-secondary, $unit-4, 'sans-serif')

  .content
    width: 100%
    height: $content-height
    display: flex

/deep/ .component-header
  width: 100%
  @include setHeightAndLineHeight($component-header-height)
  @include setFonts('Roboto', $md-dark-text-secondary, $unit-4, 'sans-serif')
  padding: 0 $unit-3
/*border: 1px solid black*/
/deep/ .component-body
  width: 100%
  height: calc(100% - #{$component-header-height})
  /*border: 1px solid black*/
  padding: 0 $unit-3

</style>
