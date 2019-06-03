<template lang="pug">
  .upset-container
    UpSetQueryComponent
    UpSetControllerComponent
</template>

<script>
import UpSetControllerComponent from './UpSetControllerComponent';
import UpSetQueryComponent from './UpSetQueryComponent';
export default {
  name: 'UpSetComponent',
  components: { UpSetQueryComponent, UpSetControllerComponent }
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
  display: flex
  overflow-x: auto
  flex-wrap: nowrap
</style>
