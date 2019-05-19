<template lang="pug">
  .mainView-option-container
    .mainView-clusterName < K-means(10) >
    .mainView-coordinate-container
      .mainView-coordinate-setter
        .mainView-coordinate
        .coordinate-state
        .coordinate-list
        .mainView-coordinate
        .coordinate-state
        .coordinate-list
      .mainView-coordinate-result Total Proportion
        |
        | 25.45%
    .mainView-controller-container
</template>

<script>
export default {
  name: 'MainView-Option'
};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.mainView-option-container
  width: 100%
  height: $mainView-option-container-height
  display: flex
  .mainView-clusterName
    width: 200px
    height: 100%
    border: 1px solid black
    @include setHeightAndLineHeight($mainView-option-container-height)
    font-size: $unit-6
    text-align: center
  .mainView-coordinate-container
    width: 520px
    height: 100%
    display: flex
    .mainView-coordinate-setter
      width: 400px
      height: 100%
      border: 1px solid black
    .mainView-coordinate-result
      width: calc(100% - 400px)
      height: 100%
      border: 1px solid black
      text-align: center
      text-wrap: normal
      line-height: 40px
    /*.mainView-coordinate-container*/
    /*  width: 100%*/
    /*  height: 50%*/
    /*  border: 1px solid black*/
  .mainView-controller-container
    width: calc(100% - 720px)
    height: 100%
    border: 1px solid black

.a
</style>
