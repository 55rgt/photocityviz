<template lang="pug">
  .wrapper
    .header.box-shadow
      .header-title Photo City Visualization {{ getCounter }}
      .header-content Identifying the Color and the Theme of City.
    .main-content
      .nav-container.box-shadow
        v-expansion-panel(v-model='panel' expand)
          v-expansion-panel-content(v-for="navComponent in navComponents")
            template(v-slot:header='')
              .nav-title {{ navComponent.title }}
            component(:is="navComponent.component")
      .main-container.box-shadow
        FilterComponent
      .detail-container.box-shadow
</template>
<script>
import FilterComponent from '../components/FilterComponent';
import NavDateComponent from '../components/NavDateComponent';
import NavTimeComponent from '../components/NavTimeComponent';
import NavCategoryComponent from '../components/NavCategoryComponent';
import { mapGetters } from 'vuex';

export default {
  name: 'MainPage',
  components: { NavCategoryComponent, NavTimeComponent, FilterComponent, NavDateComponent },
  data() {
    return {
      panel: [false, true, false],
      navComponents: [
        {
          'title': 'Date',
          'component': NavDateComponent
        },
        {
          'title': 'Time',
          'component': NavTimeComponent
        },
        {
          'title': 'Category',
          'component': NavCategoryComponent
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
        'getCounter'
    ])
  }
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
    padding: 0 $unit-largest

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

      .v-expansion-panel__container
        /deep/ .v-expansion-panel__header
          padding: $unit-middle $unit-large

          .nav-title

        .nav-body
          padding: $unit-middle $unit-large

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
