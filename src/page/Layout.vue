<template lang="pug">
  .wrapper
    Header
    RankWrapper
    Content
</template>

<script>
import RankWrapper from '../components/Rank/Rank-Wrapper';
import Content from '../components/Content';
export default {
  name: 'Layout',
  components: { Content, RankWrapper, Header}
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

/deep/ .box-shadow
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

/deep/ input
  outline: none
</style>


