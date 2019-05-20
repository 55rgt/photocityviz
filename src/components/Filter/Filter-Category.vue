<template lang="pug">
  .filter-category-container
    .component-header Category
    .component-body
</template>

<script>
export default {
  name: 'Filter-Category'
};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.filter-category-container
  width: 100%
  min-height: calc(100% - #{$filter-hashtag-container-height})
</style>
