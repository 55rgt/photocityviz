<template lang="pug">
  .photo-container
    PhotoThumbnailComponent
    PhotoInfoComponent
</template>

<script>
import PhotoThumbnailComponent from './PhotoThumbnailComponent';
import PhotoInfoComponent from './PhotoInfoComponent';
export default {
  name: 'PhotoComponent',
  components: { PhotoInfoComponent, PhotoThumbnailComponent }
};
</script>

<style scoped lang="sass">
@import "../../../style/styles"
@import "../../../style/colors"
.photo-container
  width: 100%
  height: $photo-container-height
  display: flex
  background: $md-white
  @include box_shadow
</style>
