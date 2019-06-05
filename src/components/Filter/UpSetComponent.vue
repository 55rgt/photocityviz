<template lang="pug">
  .upset-container
    UpSetQueryComponent
    UpSetRadioboxComponent
</template>

<script>
import UpSetRadioboxComponent from './UpSetRadioboxComponent';
import UpSetQueryComponent from './UpSetQueryComponent';
export default {
  name: 'UpSetComponent',
  components: { UpSetQueryComponent, UpSetRadioboxComponent },
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
</style>
