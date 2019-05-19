<template lang="pug">
  .clusterRanking-selected-container
    .component-header Selected Cluster
    .component-body
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
  width: calc(100% - #{$clusterRanking-navigator-container-width} - #{$clusterRanking-margin-right} - #{$clusterRanking-list-container-width} - #{$clusterRanking-margin-right}
  height: 100%
</style>
