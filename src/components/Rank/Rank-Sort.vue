<template lang="pug">
  .rank-container.cluster-sort-container
    .cluster-sort-description sortBy
    .cluster-sort-list-container
      .cluster-sort-item(v-for="n in 6")

</template>

<script>
export default {
  name: 'Rank-Sort'
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/sizes"
.cluster-sort-container
  @include setHeightAndLineHeight(80px)
  .cluster-sort-description
    width: 80px
    height: 100%
  .cluster-sort-list-container
    flex: 1
    display: inline-flex
    flex-wrap: wrap
    padding: $unit-3 0
    .cluster-sort-item
      width: calc(100% / 3)
      border: 1px solid black
</style>
