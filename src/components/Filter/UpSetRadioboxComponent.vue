<template lang="pug">
  .upset-radiobox-container
    .upset-radiobox-header Filter

</template>

<script>
export default {
  name: 'UpSetRadioboxComponent'
};
</script>

<style scoped lang="sass">
@import "../../style/styles"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.upset-radiobox-container
  flex: 1
  height: 100%
  padding: 0 $unit-2 $unit-2 $unit-2
  .upset-radiobox-header
    width: 100%
    @include setFonts('Roboto', $md-dark-text-secondary, $unit-4)
    @include setHeightAndLineHeight($upset-radiobox-header-height)

</style>
