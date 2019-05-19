<template lang="pug">
  .mainView-container.box-shadow
    MainViewOption
    MainViewHexMap
</template>

<script>
import MainViewOption from './MainView-Option';
import MainViewHexMap from './MainView-HexMap';
export default {
  name: 'MainView-Component',
  components: { MainViewHexMap, MainViewOption }
};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.mainView-container
  width: $mainView-container-width
  height: 100%
  background: $md-white
  margin-right: $mainView-margin-right
.a
</style>
