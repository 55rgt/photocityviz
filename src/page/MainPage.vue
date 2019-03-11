<template lang="pug">
  .wrapper
    .header
    .main-content
      .nav-container
      .main-container
        // SpiralComponent(v-for="n in 6")
      .detail-container
</template>

<script>
import SpiralComponent from '../components/SpiralComponent';

export default {
  name: 'MainPage',
  components: { SpiralComponent },
};
</script>

<style scoped lang="sass">

.wrapper
  width: 1920px
  height: 1080px
  padding: 12px
  .header
    width: 100%
    height: 72px
    background: yellow
  .main-content
    width: 100%
    height: calc(100% - 72px)
    display: flex
    .nav-container
      width: 240px
      height: 100%
      background: navy
    .main-container
      width: calc(100% - 240px - 360px)
      height: 100%
      display: inline-flex
      flex-wrap: wrap
    .detail-container
      width: 360px
      height: 100%
      background: pink


.sth

</style>
