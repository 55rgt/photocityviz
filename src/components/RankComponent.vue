<template lang="pug">
  .clusterRanking-container
    .component-header Cluster Rankings
    .component-body
      RankDisplay
</template>

<script>
import RankDisplay from './Rank/Rank-Display';
export default {
  name: 'RankComponent',
  components: { RankDisplay }
};
</script>

<style scoped lang="sass">
@import "../style/_colors.sass"
@import "../style/_sizes.sass"
.clusterRanking-container
  width: 100%
  height: $clusterRanking-container-height

</style>
