<template lang="pug">
  .filter-container
    .filter-item-container
      .filter-item-text Radius:
      input.filter-item-input
    .filter-item-container
      .filter-item-text Time A:
      input.filter-item-input
    .filter-item-container
      .filter-item-text Time B:
      input.filter-item-input
    .filter-limit-container.b
    .filter-limit-container.b
</template>

<script>
export default {
  name: 'Navigator-Filter'
};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.filter-container
  width: 100%
  height: calc(100% - 320px)
  padding: 12px
  .filter-item-container
    width: 100%
    @include setHeightAndLineHeight(48px)
    display: flex
    font-size: 18px
    .filter-item-text
      width: auto
      height: 100%
      margin-right: 12px
    .filter-item-input
      width: 60px
      height: 100%
  .filter-limit-container
    width: 100%
    height: 160px
.b
  border: 1px solid black
</style>
