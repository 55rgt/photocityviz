<template lang="pug">
  .clusterDisplay-container
    .forceLayout-display
      .component-header HexMap
      .component-body
        | -클러스터별 막대색 분포를 클릭하면 하면, 해당 HexBin 영역이 그려
        | <br>
        | -Migrate Node 기능은 HexBin 크기를 조절하여 업데이트하면 자동으로 가능할 것 같다.
        | <br>
        | -필터 (시간, 날짜, 카테고리) 추가 필
    .detail-display
      .nodeOnHover-display
        .component-header Node Info (on Click or Hover)
        .component-body
          | -좌측: 사진 리스트 / 우측: 사진을 클릭하면 사진 정보 or 선택한 육각형에 해당하는 데이터 정보
          | <br>
      .interCluster-display
        .component-header InterCluster
        .component-body
          | -클러스터 간 유사도 및 중분류의 분포 수 정도 비교. (미정)
</template>

<script>
export default {
  name: 'ClusterComponent'
};
</script>

<style scoped lang="sass">
@import "../style/_sizes.sass"
@import "../style/_colors.sass"
.clusterDisplay-container
  width: 100%
  height: calc(100% - #{$clusterRanking-container-height})
  display: flex
  .forceLayout-display
    width: $forceLayout-display-width
    height: 100%
  .detail-display
    width: calc(100% - #{$forceLayout-display-width})
    height: 100%
    .nodeOnHover-display
      width: 100%
      height: $nodeOnHover-display-height
    .interCluster-display
      width: 100%
      height: calc(100% - #{$nodeOnHover-display-height})
</style>
