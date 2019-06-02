<template lang="pug">
  .content-wrapper
    MainViewComponent
    SubViewComponent

</template>

<script>
import MainViewComponent from './MainView/MainViewComponent';
import SubViewComponent from './SubView/SubViewComponent';
export default {
  name: 'ContentComponent',
  components: { SubViewComponent, MainViewComponent }
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/styles"
.content-wrapper
  width: 100%
  height: $content-wrapper-height
  display: flex

</style>
