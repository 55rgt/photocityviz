<template lang="pug">
  .upset-container

</template>

<script>
export default {
  name: 'UpSetComponent'
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/styles"
.upset-container
  width: $upset-container-width
  height: 100%
  @include box_shadow
  background: $md-white


</style>
