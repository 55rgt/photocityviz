<template lang="pug">
  .v-app#app
    MainPage
</template>

<script>
import Vue from 'vue';
import MainPage from './page/MainPage.vue';
import VDatePicker from 'v-calendar';
// Use v-calendar & v-date-picker components
Vue.use(VDatePicker, {
  componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
});

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
