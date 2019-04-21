<template lang="pug">
  .wrapper
    .header.box-shadow
      .header-title Photo City Visualization
      .header-content Identifying the Color and the Theme of City.
    .main-content
      .nav-container.box-shadow
        v-expansion-panel(v-model='panel' expand)
          v-expansion-panel-content(v-for="navComponent in navComponents")
            template(v-slot:header='')
              .nav-title {{ navComponent.title }}
            component(:is="navComponent.component")
      .main-container.box-shadow
        .main-treemap-wrapper
          .treemap-view-container
            .treemap-view-header Cluster No.7
            .treemap-view-content
              FilterComponent
          .treemap-shortcut-container
            .treemap-empty-container
              .treemap-empty-header
              .treemap-empty-header Explore Option
              .treemap-empty-content
            .treemap-correlation-container
              .treemap-correlation-header Dimension Correlation
              .treemap-correlation-content
                .treemap-correlation-img
        .main-distribution-wrapper Data Distribution
      .detail-container.box-shadow
        .detail-header Explore
        .detail-label-container Label
        .detail-docuburst-container Docuburst
        .detail-colorMap-container ColorMap
</template>
<script>
import FilterComponent from '../components/FilterComponent';
import NavDateComponent from '../components/NavDateComponent';
import NavTimeComponent from '../components/NavTimeComponent';
import NavCategoryComponent from '../components/NavCategoryComponent';
import ClusterComponent from '../components/ClusterComponent';
import HashTagComponent from '../components/HashTagComponent';
import { mapGetters } from 'vuex';
import { EventBus } from '../utils/event-bus'

export default {
  name: 'MainPage',
  components: { NavCategoryComponent, NavTimeComponent, FilterComponent, NavDateComponent, HashTagComponent, ClusterComponent },
  data() {
    return {
      panel: [false, false, false],
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
          'title': 'HashTag',
          'component': HashTagComponent
        },
        {
          'title': 'Category',
          'component': NavCategoryComponent
        },
        {
          'title': 'Cluster',
          'component': ClusterComponent
        }
      ]
    };
  },
  created() {
    EventBus.$on("update", () => {
      console.log('update Main!')
    });
  },
  computed: {
    ...mapGetters([
        'getLength'
    ])
  }
};
</script>

<style scoped lang="sass">
@import "../style/_colors.sass"
@import "../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
@mixin nav_default($bottomState)
  @if $bottomState == true
    border-bottom: 1px solid rgba(0,0,0,0.12)
  padding: $unit-middle $unit-middle $unit-middle $unit-largest
  font-size: $font-size-third
// mixin으로 Lineheight 맞추는 거 할 수 있겠다!


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
      $nav-element-height: 66px
      $nav-title-line-height: 42px
      .nav-element-container
        width: 100%
        height: $nav-element-height
        @include nav_default(true)
        line-height: $nav-title-line-height
        display: flex
        .nav-element-title
          width: auto
          margin-right: 36px
          height: 100%
        .nav-element-body
          flex: 1
          padding-right: $unit-large
      .v-expansion-panel__container
        /deep/ .v-expansion-panel__header
          min-height: 66px
          @include nav_default(true)
        .nav-body
          @include nav_default(false)
    .main-container
      width: calc(100% - #{$nav-container-width} - #{$detail-container-width})
      height: 100%
      display: inline-flex
      flex-wrap: wrap
      background: $md-white
      $main-treemap-container-height: 630px
      .main-treemap-wrapper
        width: 100%
        height: $main-treemap-container-height
        display: flex
        $treemap-view-width: 840px
        .treemap-view-container
          width: $treemap-view-width
          height: 100%
          $treemap-view-header-height: 36px
          .treemap-view-header
            width: 100%
            height: $treemap-view-header-height
            padding: 0 $unit-middle
            font-size: $font-size-third
            color: $md-dark-text-primary
            line-height: 48px
          .treemap-view-content
            width: 100%
            height: calc(100% - #{$treemap-view-header-height})
        .treemap-shortcut-container
          width: calc(100% - #{$treemap-view-width})
          height: 100%
          $treemap-correlation-height: 360px
          .treemap-empty-container
            width: 100%
            height: calc(100% - #{$treemap-correlation-height})
            $treemap-empty-header-height: 36px
            .treemap-empty-header
              width: 100%
              height: $treemap-empty-header-height
              padding: 0 $unit-middle
              font-size: $font-size-third
              color: $md-dark-text-primary
              line-height: 48px
            .treemap-empty-content
              width: 100%
              height: calc(100% - #{$treemap-empty-header-height})
          .treemap-correlation-container
            width: 100%
            height: $treemap-correlation-height
            $treemap-correlation-header-height: 36px
            .treemap-correlation-header
              width: 100%
              height: $treemap-correlation-header-height
              padding: 0 $unit-middle
              font-size: $font-size-third
              color: $md-dark-text-primary
              line-height: 48px
            .treemap-correlation-content
              width: 100%
              height: calc(100% - #{$treemap-correlation-header-height})
              padding: $unit-middle
              .treemap-correlation-img
                width: 100%
                height: 100%
                /*background-image: url('../../public/images/cluster_image.png')*/
                /*background-size: contain*/
      .main-distribution-wrapper
        width: 100%
        height: calc(100% - #{$main-treemap-container-height})
        padding: $unit-middle
        font-size: $font-size-third
        color: $md-dark-text-primary
    .detail-container
      width: $detail-container-width
      height: 100%
      background: $md-white
      margin-left: $unit-middle
      padding: $unit-middle
      $detail-header-height: 36px
      .detail-header
        width: 100%
        height: 36px
        line-height: 36px
        font-size: $font-size-third
        color: $md-dark-text-primary
      .detail-label-container
        width: 100%
        height: 300px
        margin-bottom: $unit-small
        padding: $unit-middle
        font-size: $font-size-fourth
      .detail-docuburst-container
        width: 100%
        height: 300px
        margin-bottom: $unit-small
        padding: $unit-middle
        font-size: $font-size-fourth
      .detail-colorMap-container
        width: 100%
        height: calc(100% - 642px)
        margin-bottom: $unit-small
        padding: $unit-middle
        font-size: $font-size-fourth
.box-shadow
  -webkit-box-shadow: 0 3px 5px 1px $md-grey-400
  -moz-box-shadow: 0 3px 5px 1px $md-grey-400
  box-shadow: 0 3px 5px 1px $md-grey-400

</style>
