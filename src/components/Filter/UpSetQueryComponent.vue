<template lang="pug">
  .upset-query-container
    .upset-query-legend-container
    .upset-query-list-container
</template>

<script>
export default {
  name: 'UpSetQueryComponent'
};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.upset-query-container
  width: auto
  height: 100%
  flex: 0 0 auto
  display: flex
  margin-right: $unit-3
  .upset-query-legend-container
    width: 60px
    height: 100%
    border: 1px solid black
  .upset-query-list-container
    width: auto
    height: 100%

</style>
