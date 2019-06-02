<template lang="pug">
  .sub-container
    LabelsComponent
    PhotoComponent
</template>

<script>
import LabelsComponent from './LabelsComponent';
import PhotoComponent from './PhotoComponent';
export default {
  name: 'SubViewComponent',
  components: { PhotoComponent, LabelsComponent }
};
</script>

<style scoped lang="sass">
@import "../../../style/colors"
@import "../../../style/styles"
.sub-container
  width: $sub-container-width
  height: 100%
</style>
