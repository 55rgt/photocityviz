<template lang="pug">
  .navigator-container
</template>

<script>
export default {
  name: 'NavigatorComponent'
};
</script>

<style scoped lang="sass">
@import "../../../style/styles"
.navigator-container
  width: $navigator-container-width
  height: $navigator-container-height
  position: absolute
  top: calc(#{$unit-4} + #{$legend-container-height})
  left: $unit-4
  border: 1px solid black

</style>
