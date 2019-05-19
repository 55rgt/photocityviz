<template lang="pug">
  .rank-container.cluster-method-container
    .cluster-method-description method
    .cluster-method-list-container
      .cluster-method-item(v-for="n in 4")
</template>

<script>
export default {
  name: 'Rank-Method',
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/sizes"
.cluster-method-container
  @include setHeightAndLineHeight(72px)

  .cluster-method-description
    width: 80px
    height: 100%

  .cluster-method-list-container
    flex: 1
    display: flex
    padding: $unit-5 0

    .cluster-method-item
      flex: 1
      border: 1px solid black
</style>
