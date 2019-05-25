<template lang="pug">
  .navigator-filter-container
    .navigator-header Settings
    .navigator-filter-item-container
      .navigator-filter-item-name Hexagon Radius
      .navigator-filter-item-input-wrapper
        input.navigator-filter-item-input
    .navigator-filter-item-container
      .navigator-filter-item-name Sample (0 ~ 100%)
      .navigator-filter-item-input-wrapper
        input.navigator-filter-item-input
    .navigator-filter-item-container
      .navigator-filter-item-name Month A (1 ~ 12)
      .navigator-filter-item-input-wrapper
        input.navigator-filter-item-input
      .navigator-filter-unit-space ~
      .navigator-filter-item-input-wrapper
        input.navigator-filter-item-input
    .navigator-filter-item-container
      .navigator-filter-item-name Month B (1 ~ 12)
      .navigator-filter-item-input-wrapper
        input.navigator-filter-item-input
      .navigator-filter-unit-space ~
      .navigator-filter-item-input-wrapper
        input.navigator-filter-item-input
</template>

<script>
export default {
  name: 'Navigator-Settings'
};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.navigator-filter-container
  width: 100%
  height: $navigator-settings-container-height
  padding: 0 $unit-3 $unit-3 $unit-3
  border-bottom: 1px solid #cbcbcb
  .navigator-header
    width: 100%
    @include setFonts('Roboto', $md-dark-text-secondary, $unit-4)
    @include setHeightAndLineHeight(40px)
  .navigator-filter-item-container
    width: 100%
    @include setHeightAndLineHeight(36px)
    font-weight: 500
    padding: 0 $unit-3
    display: flex
    .navigator-filter-item-name
      width: 172px
      height: 100%
      @include setFonts('Roboto', #686868, $unit-4)
    .navigator-filter-unit-space
      width: 20px
      text-align: center
      height: 100%
    .navigator-filter-item-input-wrapper
      width: 36px
      height: 100%
      display: flex
      align-items: center
      justify-content: center
      input.navigator-filter-item-input
        width: 100%
        height: 20px
        text-align: center
        box-sizing: content-box
        border-bottom: 2px solid #8f8f8f



.b
</style>
