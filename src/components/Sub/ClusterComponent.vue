<template lang="pug">
  .cluster-container
    SummaryComponent
    GalleryComponent

</template>

<script>
import SummaryComponent from './SummaryComponent';
import GalleryComponent from './GalleryComponent';
export default {
  name: 'ClusterComponent',
  components: { GalleryComponent, SummaryComponent }
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/styles"
.cluster-container
  width: 100%
  height: $cluster-container-height
  background: $md-white
  @include box_shadow
  display: flex

</style>
