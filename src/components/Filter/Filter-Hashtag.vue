<template lang="pug">
  .filter-hashtag-container
    .component-header Hashtag
    .component-body
      .filter-hashtag-input-container
        input.filter-hashtag-input(v-model="hashtagInput" placeholder="search hashtag")
      .filter-hashtag-header-container
      .filter-hashtag-list

</template>

<script>
export default {
  name: 'Filter-Hashtag',
  data() {
    return {
      hashtagInput: null
    };
  }
};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.filter-hashtag-container
  width: 100%
  min-height: $filter-hashtag-container-height
  .filter-hashtag-input-container
    width: 100%
    @include setHeightAndLineHeight($filter-hashtag-input-container-height)
    padding: 0 $unit-3
    .filter-hashtag-input
      width: $filter-hashtag-input-width
      height: 100%
      border: 1px solid #acacac
      border-radius: 4px
      padding: 0 $unit-1

.b
  border: 1px solid black
</style>
