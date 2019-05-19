<template lang="pug">
  .clusterRanking-container
    RankNavigator
    RankList
    RankSelected
</template>

<script>
import RankNavigator from './Rank-Navigator';
import RankList from './Rank-List';
import RankSelected from './Rank-Selected';
export default {
  name: 'Rank-Component',
  components: { RankSelected, RankList, RankNavigator }
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/sizes"
.clusterRanking-container
  width: 100%
  height: 100%
  display: flex

</style>
