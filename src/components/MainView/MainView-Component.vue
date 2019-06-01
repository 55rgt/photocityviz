<template lang="pug">
  .mainView-container.box-shadow
    MainViewHexMap
</template>

<script>
import MainViewHexMap from './MainView-HexMap';
export default {
  name: 'MainView-Component',
  components: { MainViewHexMap }
};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.mainView-container
  flex: 1
  height: 100%
  background: $md-white
  margin-right: 0
.a
</style>
