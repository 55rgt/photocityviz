<template lang="pug">
  .nav-query-container
    .component-header Query
    .component-body
      .nav-query-header
      .nav-query-item
</template>

<script>
export default {
  name: 'NavQueryComponent'
};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.nav-query-container
  width: 100%
  height: $nav-query-height
</style>
