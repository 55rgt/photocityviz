<template lang="pug">
  .header.box-shadow
    .header-title Photo City Visualization
    .header-sub Identifying the Color and the Theme of City.
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style scoped lang="sass">
@import "../style/_colors.sass"
@import "../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.header
  width: 100%
  @include setHeightAndLineHeight($header-height)
  display: flex
  background: $md-white
  padding: 0 $unit-3
  margin-bottom: $header-margin-bottom
  .header-title
    width: auto
    height: 100%
    margin-right: $unit-2
    @include setFonts('Roboto', $md-dark-text-primary, $unit-5)
  .header-sub
    width: auto
    height: 100%
    @include setFonts('Roboto', $md-dark-text-secondary, $unit-4)
</style>
