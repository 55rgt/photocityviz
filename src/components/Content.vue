<template lang="pug">
  .content-wrapper
    NavigatorComponent
    MainViewComponent
    //SubViewComponent
</template>

<script>
import MainViewComponent from './MainView/MainView-Component';
import NavigatorComponent from './Navigator/Navigator-Component';
import SubViewComponent from './SubView/SubView-Component';
export default {
  name: 'Content',
  components: { SubViewComponent, NavigatorComponent , MainViewComponent }
};
</script>

<style scoped lang="sass">
@import "../style/_colors.sass"
@import "../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.content-wrapper
  width: 100%
  height: calc(100% - #{$header-height} - #{$header-margin-bottom} - #{$clusterRanking-wrapper-height} - #{$header-margin-bottom})
  display: flex

</style>
