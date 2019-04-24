<template lang="pug">
  .clusterRanking-container
    .clusterRanking-navigator Rank-Navigator
      | <br>
      | -이 영역이 있어야할지 아닐지 모르겠음.
      | <br>
      | -오른쪽 영역에서 Show 5 등의 것들?
      | <br>
      | -알고리즘 선택하는 부분
      | <br>
      | -왼쪽 디스플레이 결정
    .clusterRanking-display Rank-Display
      | <br>
      | -SanKey 등을 이용 하는 식? 그룹 막대 바 (비율에 따라) 표현해야 하고, metrics 점수 있어야 하고
      | <br>
      | -또 Group Name 있어야 하고, Algorithm (Optional)
      | <br>
      | -전반적으로 Table 형식으로 만들고, Header를 누르면 오름차순 / 내림차순 가능하
</template>

<script>
export default {
  name: 'RankComponent'
};
</script>

<style scoped lang="sass">
@import "../style/_sizes.sass"
.clusterRanking-container
  width: 100%
  height: $clusterRanking-container-height
  display: flex
  .clusterRanking-navigator
    width: $clusterRanking-navigator-width
    height: 100%
    @include b
  .clusterRanking-display
    width: calc(100% - #{$clusterRanking-navigator-width})
    height: 100%
    @include b

</style>
