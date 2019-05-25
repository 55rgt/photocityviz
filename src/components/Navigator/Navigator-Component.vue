<template lang="pug">
  .navigator-container.box-shadow
    NavigatorSettings
    NavigatorFilter
    NavigatorHexagon
</template>

<script>
import NavigatorSettings from './Navigator-Settings';
import NavigatorHexagon from './Navigator-Hexagon';
import NavigatorFilter from './Navigator-Filter';
export default {
  name: 'Navigator-Component',
  components: { NavigatorFilter, NavigatorHexagon, NavigatorSettings },
};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.navigator-container
  width: $navigator-container-width
  height: 100%
  background: $md-white
  margin-right: $mainView-margin-right
.b
  border: 1px solid black
</style>
