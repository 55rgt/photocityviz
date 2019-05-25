<template lang="pug">
  .navigator-hexagon-container
    .navigator-header Selected Hexagon

</template>

<script>
export default {
  name: 'Navigator-Hexagon'
};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.navigator-hexagon-container
  width: 100%
  height: $navigator-hexagon-container-height
  padding: 0 $unit-3
  .navigator-header
    width: 100%
    @include setFonts('Roboto', $md-dark-text-secondary, $unit-4)
    @include setHeightAndLineHeight(40px)

</style>
