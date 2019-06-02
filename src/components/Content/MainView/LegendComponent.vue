<template lang="pug">
  .legend-container
</template>

<script>
export default {
  name: 'LegendComponent'
};
</script>

<style scoped lang="sass">
@import "../../../style/styles"
.legend-container
  width: $legend-container-width
  height: $legend-container-height
  position: absolute
  top: $unit-4
  left: $unit-4
  border: 1px solid black

</style>
