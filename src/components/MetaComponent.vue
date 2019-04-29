<template lang="pug">
  .subView-metaInfo
    .component-header Meta
    .component-body
      | - 1. Label 2. HashTag 3. ColorMap
      | <br>
      | -옵션: (View By Group / Country)
      | <br>
      | -label: 이전에 했던 시각화
      | <br>
      | -HastTag: 워드클라우드: Group 또는 Country에 따라 색상을 달리하는 등의 ...
      | <br>
      | -ColorMap: 미정
</template>

<script>
export default {
  name: 'MetaComponent'
};
</script>

<style scoped lang="sass">
@import "../style/_sizes.sass"
.subView-metaInfo
  width: 100%
  height: calc(100% - #{$subView-navigator-height} - #{$subView-heatMap-height})
</style>
