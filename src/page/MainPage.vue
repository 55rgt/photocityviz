<template lang="pug">
  .wrapper
    .header.box-shadow
      .header-title Photo City Visualization
      .header-content Identifying the Color and the Theme of City.
    .main-content
      .nav-container.box-shadow
      .main-container.box-shadow
      .detail-container.box-shadow
</template>

<script>
import SpiralComponent from '../components/SpiralComponent';

export default {
  name: 'MainPage',
  components: { SpiralComponent },
};
</script>

<style scoped lang="sass">
@import "../style/_colors.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')

$unit-small: 6px
$unit-middle: 12px
$unit-large: 18px

$font-size-first: 24px
$font-size-second: 21px
$font-size-third: 18px
$font-size-fourth: 15px
$font-size-fifth: 12px

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
    $nav-container-width: 330px
    $detail-container-width: 450px
    .nav-container
      width: $nav-container-width
      height: 100%
      background: $md-white
      margin-right: $unit-middle
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
