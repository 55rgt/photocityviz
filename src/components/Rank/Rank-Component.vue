<template lang="pug">
  .clusterRanking-container
    .component-header Cluster Rankings
    .component-body
      RankDisplay
</template>

<script>
import RankDisplay from './Rank-Display';
export default {
  name: 'Rank-Component',
  components: { RankDisplay }
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/sizes"
.clusterRanking-container
  width: 100%
  height: $clusterRanking-container-height

</style>
