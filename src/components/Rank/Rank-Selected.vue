<template lang="pug">
  .clusterRanking-selected-container
    .navigator-header Selected Cluster Information
</template>

<script>
export default {
  name: 'Rank-Selected'
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/sizes"
.clusterRanking-selected-container
  width: calc(100% - #{$clusterRanking-margin-right} - #{$clusterRanking-list-container-width})
  height: 100%
  border-left: 8px solid #dcdcdc
  padding: 0 $unit-3
  .navigator-header
    width: 100%
    @include setFonts('Roboto', $md-dark-text-secondary, $unit-4)
    @include setHeightAndLineHeight(40px)

</style>
