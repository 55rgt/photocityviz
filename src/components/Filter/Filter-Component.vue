<template lang="pug">
  .filter-container.box-shadow
    FilterHashtag
    FilterCategory
</template>

<script>
import FilterHashtag from './Filter-Hashtag';
import FilterCategory from './Filter-Category';
export default {
  name: 'Filter-Component',
  components: { FilterCategory, FilterHashtag }
};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.filter-container
  width: $filter-container-width
  height: 100%
  background: $md-white
  margin-right: $mainView-margin-right
.b
  border: 1px solid black
</style>
