<template lang="pug">
  .wrapper
    HeaderComponent
    FilterComponent
    ContentComponent


</template>

<script>
import HeaderComponent from '../components/Header/HeaderComponent';
import FilterComponent from '../components/Filter/FilterComponent';
import ContentComponent from '../components/Content/ContentComponent';
export default {
  name: 'Wrapper',
  components: { ContentComponent, FilterComponent, HeaderComponent }
};
</script>

<style scoped lang="sass">
@import "../style/colors"
@import "../style/styles"
.wrapper
  width: 1920px
  height: 1080px
  background: $md-grey-200
  padding: $unit-2
</style >
