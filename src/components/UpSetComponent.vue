<template lang="pug">
  .subView-navigator
    .subView-upSet
      .component-header Upset
      .component-body
    .subView-upSetView
      .component-header HexBin Venn-Diagram
      .component-body
</template>

<script>
export default {
  name: 'UpSetComponent'
};
</script>

<style scoped lang="sass">
@import "../style/_sizes.sass"
.subView-navigator
  width: 100%
  height: $subView-navigator-height
  display: flex
  .subView-upSet
    width: $subView-upSet-width
    height: 100%
  .subView-upSetView
    width: calc(100% - #{$subView-upSet-width})
    height: 100%
</style>
