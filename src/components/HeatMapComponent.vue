<template lang="pug">
  .subView-heatMap
    .component-header HeatMap
    .component-body 국가별 Upset에서 선택된 데이터들의 분포를 보여주는 시각화
</template>

<script>
export default {
  name: 'HeatMapComponent'
};
</script>

<style scoped lang="sass">
@import "../style/_sizes.sass"
.subView-heatMap
  width: 100%
  height: $subView-heatMap-height
</style>
