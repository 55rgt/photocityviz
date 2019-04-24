<template lang="pug">
  .clusterDisplay-container
    .forceLayout-display
      .component-header Force-Layout (Zoom + Panning)
      .component-body
        | -ClusterRanking에서 클러스터별 막대색 분포를 hover 하면, 해당 영역의 벤 다이어그램이 hover되게
        | <br>
        | -Migrate Node 기능 추가 가능 (version 2)
        | <br>
        | -필터와 Node Unit(Migrate)를 모두 다 옵션에 두는데, 옵션은 버튼을 누르면 expand 하거나 popup으로
    .detail-display
      .nodeOnHover-display
        .component-header Node Info (on Click or Hover)
        .component-body
          | -좌측은 그리드식 사진배열 나타나고, 사진을 누르면 우측에 노드 정보
          | <br>
          | -노드가 아닌 벤 다이어그램을 눌렀을 때는 그 영역에 해당하는 애들 정보로
      .interCluster-display
        .component-header InterCluster
        .component-body
          | -클러스터 간 유사도 및 중분류의 분포 수 정도 비교.
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
