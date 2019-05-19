<template lang="pug">
  .clusterRanking-wrapper.box-shadow
    RankComponent
</template>

<script>
import RankComponent from './Rank-Component';
export default {
  name: 'Rank-Wrapper',
  components: { RankComponent }
};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.clusterRanking-wrapper
  width: 100%
  height: $clusterRanking-wrapper-height
  margin-bottom: $header-margin-bottom
  background: $md-white

</style>
