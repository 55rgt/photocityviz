<template lang="pug">
  .main-container
    LegendComponent
    HexMapComponent
    NavigatorComponent

</template>

<script>
import LegendComponent from './LegendComponent';
import NavigatorComponent from './NavigatorComponent';
import HexMapComponent from './HexMapComponent';
export default {
  name: 'MainViewComponent',
  components: { HexMapComponent, NavigatorComponent, LegendComponent }
};
</script>

<style scoped lang="sass">
@import "../../../style/colors"
@import "../../../style/styles"
.main-container
  width: $main-container-width
  height: 100%
  margin-right: $main-container-margin-right
  background: $md-white
  position: relative
  @include box_shadow


</style>
