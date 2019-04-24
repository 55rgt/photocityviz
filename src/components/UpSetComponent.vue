<template lang="pug">
  .subView-navigator
    .subView-upSet Upset
    .subView-upSetView Venn-Diagram ShortCut
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
    @include b
  .subView-upSetView
    width: calc(100% - #{$subView-upSet-width})
    height: 100%
    @include b
</style>
