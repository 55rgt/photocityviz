<template lang="pug">
  .wrapper
    .header.b Title
    .content
      .mainView-container
        .clusterRanking-container
          .clusterRanking-navigator.b Rank-Navigator
            | <br>
            | -이 영역이 있어야할지 아닐지 모르겠음.
            | <br>
            | -오른쪽 영역에서 Show 5 등의 것들?
            | <br>
            | -알고리즘 선택하는 부분
            | <br>
            | -왼쪽 디스플레이 결정
          .clusterRanking-display.b Rank-Display
            | <br>
            | -SanKey 등을 이용 하는 식? 그룹 막대 바 (비율에 따라) 표현해야 하고, metrics 점수 있어야 하고
            | <br>
            | -또 Group Name 있어야 하고, Algorithm (Optional)
            | <br>
            | -전반적으로 Table 형식으로 만들고, Header를 누르면 오름차순 / 내림차순 가능하
        .clusterDisplay-container
          .forceLayout-display.b Force-Layout (Zoom + Panning)
            | <br>
            | -ClusterRanking에서 클러스터별 막대색 분포를 hover 하면, 해당 영역의 벤 다이어그램이 hover되게
            | <br>
            | -Migrate Node 기능 추가 가능 (version 2)
            | <br>
            | -필터와 Node Unit(Migrate)를 모두 다 옵션에 두는데, 옵션은 버튼을 누르면 expand 하거나 popup으로
          .detail-display
            .nodeOnHover-display.b Node Info (on Click or Hover)
              | <br>
              | -좌측은 그리드식 사진배열 나타나고, 사진을 누르면 우측에 노드 정보
            .interCluster-display.b InterCluster
      .subView-container
        .subView-navigator
          .subView-upSet.b Upset
          .subView-shortcut.b Venn-Diagram ShortCut
        .subView-heatMap.b HeatMap
        .subView-metaInfo.b Meta
          | <br>
          | -3개의 레이아웃을 carousel 같은 형식으로 보여준다.
          | <br>
          | - 1. Label 2. HashTag 3. ColorMap
          | <br>
          | -(View By Group / Country)는 항상 옵션으로 두어서 쓸 수 있게 한다.
</template>

<script>
export default {
  name: 'Layout2'
};
</script>

<style scoped lang="sass">
@import "../style/_colors.sass"
@import "../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.wrapper
  width: 1920px
  height: 1080px
  .header
    width: 100%
    height: 60px
  .content
    width: 100%
    height: calc(100% - 60px)
    display: flex
    .mainView-container
      width: 1120px
      height: 100%
      .clusterRanking-container
        width: 100%
        height: 320px
        display: flex
        .clusterRanking-navigator
          width: 240px
          height: 100%
        .clusterRanking-display
          width: calc(100% - 240px)
          height: 100%
      .clusterDisplay-container
        width: 100%
        height: calc(100% - 320px)
        display: flex
        .forceLayout-display
          width: 680px
          height: 100%
        .detail-display
          width: calc(100% - 680px)
          height: 100%
          .nodeOnHover-display
            width: 100%
            height: 240px
          .interCluster-display
            width: 100%
            height: calc(100% - 240px)
    .subView-container
      width: calc(100% - 1120px)
      height: 100%
      .subView-navigator
        width: 100%
        height: 240px
        display: flex
        .subView-upSet
          width: 440px
          height: 100%
        .subView-shortcut
          width: calc(100% - 440px)
          height: 100%
      .subView-heatMap
        width: 100%
        height: 320px
      .subView-metaInfo
        width: 100%
        height: calc(100% - 240px - 320px)



.b
  border: 1px solid black
  padding: 12px
  font-size: 20px

</style>


