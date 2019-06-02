<template lang="pug">
  .photo-info-container
    PhotoImageComponent
    PhotoTextComponent
</template>

<script>
import PhotoImageComponent from './PhotoImageComponent';
import PhotoTextComponent from './PhotoTextComponent';
export default {
  name: 'PhotoInfoComponent',
  components: { PhotoTextComponent, PhotoImageComponent }
};
</script>

<style scoped lang="sass">
@import "../../../style/styles"
.photo-info-container
  width: $photo-info-container-width
  height: 100%
  display: flex
</style>
