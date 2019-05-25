<template lang="pug">
  .navigator-filter-container
    .navigator-header Show
    .navigator-filter-content
      .navigator-show-item-wrapper
        .navigator-show-item-name Countries
        .navigator-show-item-container
          .navigator-show-item-list
      .navigator-show-item-wrapper
        .navigator-show-item-name Clusters
        .navigator-show-item-container
          .navigator-show-item-list
    .navigator-header Highlight
    .navigator-filter-content
      .navigator-show-item-wrapper
        .navigator-show-item-name Countries
        .navigator-show-item-container
          .navigator-show-item-list
      .navigator-show-item-wrapper
        .navigator-show-item-name Clusters
        .navigator-show-item-container
          .navigator-show-item-list
    .navigator-apply-container
      .navigator-apply Apply

</template>

<script>
export default {
  name: 'Navigator-Filter'
};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.navigator-filter-container
  width: 100%
  height: calc(100% - #{$navigator-settings-container-height} - #{$navigator-hexagon-container-height})
  padding: 0 $unit-3 $unit-3 $unit-3
  border-bottom: 1px solid #cbcbcb
  .navigator-header
    width: 100%
    @include setFonts('Roboto', $md-dark-text-secondary, $unit-4)
    @include setHeightAndLineHeight(40px)
  .navigator-filter-content
    width: 100%
    height: 64px
    .navigator-show-item-wrapper
      width: 100%
      height: 32px
      display: flex
      padding: 0 $unit-3
      .navigator-show-item-name
        width: 96px
        line-height: 32px
        height: 100%
        font-weight: 500
        @include setFonts('Roboto', #686868, $unit-4)
      .navigator-show-item-container
        flex: 1
        display: flex
        align-items: center
        justify-content: center
        .navigator-show-item-list
          width: 100%
          height: 24px
          border: 1px solid black
  .navigator-apply-container
    width: 100%
    height: 36px
    margin-top: $unit-1
    .navigator-apply
      @include setFonts('Roboto', #686868, $unit-4)
      width: 100%
      line-height: 32px
      text-align: center
      height: 100%
      border: 1px solid #cbcbcb
      border-radius: $unit-4
      transition: 0.3s
      cursor: pointer
      &:hover
        background: rgba(0,0,0, 0.08)

.b
  border: 1px solid black

</style>
