<template lang="pug">
  .subView-heatMap
    .component-header HeatMap
    .component-body
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
