<template lang="pug">
  .labels-container
    LabelComponent(v-for="n in 12")
</template>

<script>
import LabelComponent from './LabelComponent';
export default {
  name: 'LabelsComponent',
  components: { LabelComponent }
};
</script>

<style scoped lang="sass">
@import "../../../style/styles"
@import "../../../style/colors"
.labels-container
  width: 100%
  height: $labels-container-height
  display: flex
  flex-wrap: wrap
  margin-bottom: $labels-container-margin-bottom
  background: $md-white
  @include box_shadow
  overflow: scroll

</style>
