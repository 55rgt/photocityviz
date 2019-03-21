<template lang="pug">
  .wrapper
    .header.box-shadow
      .header-title Photo City Visualization
      .header-content Identifying the Color and the Theme of City.
    .main-content
      .nav-container.box-shadow
        .nav-element.nav-vm-container
          .nav-title View Mode
          .nav-vm-radio-container
        .nav-element.nav-search-container
          .nav-title Search
        .nav-element.nav-date-container
          .nav-title Date
        .nav-element.nav-time-container
          .nav-title Time
        .nav-element.nav-category-container
          .nav-title Categories
      .main-container.box-shadow
        FilterComponent
      .detail-container.box-shadow
</template>
<script>
import FilterComponent from '../components/FilterComponent';

export default {
  name: 'MainPage',
  components: { FilterComponent },
};
</script>

<style scoped lang="sass">
@import "../style/_colors.sass"
@import "../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')

.wrapper
  width: 1920px
  height: 1080px
  padding: $unit-middle
  background: $md-grey-200
  $header-height: 72px
  .header
    width: 100%
    height: $header-height
    background: $md-white
    margin-bottom: $unit-small
    display: flex
    padding: 0 $unit-large
    .header-title
      width: auto
      height: 100%
      line-height: $header-height
      margin-right: $unit-middle
      font-size: $font-size-first
      font-family: 'Roboto', sans-serif
      color: $md-dark-text-primary
    .header-content
      width: auto
      height: 100%
      line-height: calc(#{$header-height} + #{$unit-small})
      font-size: $font-size-fourth
      font-family: 'Roboto', sans-serif
      color: $md-dark-text-secondary
  .main-content
    width: 100%
    height: calc(100% - #{$header-height} - #{$unit-middle})
    display: flex
    $nav-container-width: 300px
    $detail-container-width: 390px
    .nav-container
      width: $nav-container-width
      height: 100%
      background: $md-white
      margin-right: $unit-middle
      padding: $unit-large 0
      $nav-title-height: 48px
      $nav-title-line-height: 36px
      .nav-element
        width: 100%
        height: auto
        padding: $unit-small $unit-large
        border: 1px solid $md-blue-grey-300
        display: flex
        .nav-title
          line-height: $nav-title-line-height
          font-size: $font-size-fourth
          font-family: 'Roboto', sans-serif
          color: $md-dark-text-primary
          font-weight: 500
          margin-right: $unit-large
      .nav-vm-container
        width: 100%
        height: $nav-title-height
        .nav-vm-radio-container
          flex: 1
    .main-container
      width: calc(100% - #{$nav-container-width} - #{$detail-container-width})
      height: 100%
      display: inline-flex
      flex-wrap: wrap
      background: $md-white
    .detail-container
      width: $detail-container-width
      height: 100%
      background: $md-white
      margin-left: $unit-middle

.box-shadow
  -webkit-box-shadow: 0 3px 5px 1px $md-grey-400
  -moz-box-shadow: 0 3px 5px 1px $md-grey-400
  box-shadow: 0 3px 5px 1px $md-grey-400

</style>
