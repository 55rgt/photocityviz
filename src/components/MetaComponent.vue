<template lang="pug">
  .subView-metaInfo Meta
    | <br>
    | -3개의 레이아웃을 carousel / multiTab 같은 형식으로 보여준다.
    | <br>
    | - 1. Label 2. HashTag 3. ColorMap
    | <br>
    | -(View By Group / Country)는 항상 옵션으로 두어서 쓸 수 있게 한다.
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
  @include b
</style>
