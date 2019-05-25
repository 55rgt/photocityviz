<template lang="pug">
  .navigator-container.box-shadow
    NavigatorFilter
    .hex-description-container.b


</template>

<script>
import NavigatorFilter from './Navigator-Filter';
export default {
  name: 'Navigator-Component',
  components: { NavigatorFilter },
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
  .hex-description-container
    width: 100%
    height: 320px
.b
  border: 1px solid black
</style>
