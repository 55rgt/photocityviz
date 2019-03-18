<template lang="pug">
  .v-app#app
    MainPage
</template>

<script>
import MainPage from './page/MainPage.vue';

export default {
  name: 'App',
  components: {
    MainPage
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style scoped lang="sass">

*
  padding: 0
  margin: 0
  -webkit-box-sizing: border-box
  -moz-box-sizing: border-box
  box-sizing: border-box
  overflow: scroll

</style>
