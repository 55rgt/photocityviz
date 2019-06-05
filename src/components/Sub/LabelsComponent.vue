<template lang="pug">
  .labels-container
    .component-header Distribution
    .component-body

</template>

<script>
export default {
  name: 'LabelsComponent'
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/styles"
.labels-container
  width: 100%
  height: $labels-container-height
  background: $md-white
  @include box_shadow
  margin-bottom: $unit-2

</style>
