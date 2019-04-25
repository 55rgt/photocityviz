<template lang="pug">
  .clusterRanking-display
    .clusterRanking-display-navigator Sort By: ___ + Canvas List Shortcut
    .clusterRanking-display-body
      .clusterRanking-idx.b
      .clusterRanking-list
        RankItem(v-for="n in 4" :idx="getID(n)")
      .clusterRanking-idx.b
</template>

<script>
import RankItem from './Rank-Item';
export default {
  name: 'Rank-Display',
  components: { RankItem },
  methods: {
    getID(n) {
      return `rank-${n}`;
    }
  },
  mounted() {
    // console.log(this.$refs)
  },
  computed: {

  }
};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
.clusterRanking-display
  width: 100%
  height: 100%
  padding: 0 $unit-2 $unit-2 0
  .clusterRanking-display-navigator
    width: 100%
    @include setHeightAndLineHeight($clusterRanking-display-navigator-height)
  .clusterRanking-display-body
    width: 100%
    height: calc(100% - #{$clusterRanking-display-navigator-height})
    display: flex
    .clusterRanking-idx
      flex: 1
      height: 100%
    .clusterRanking-list
      width: $clusterRanking-list-width
      height: 100%
      display: flex
      overflow-x: hidden
.b
  border: 1px solid black

</style>
