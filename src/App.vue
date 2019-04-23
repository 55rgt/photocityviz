<template lang="pug">
  .v-app#app
    //MainPage
    Layout2
</template>

<script>
import Vue from 'vue';
import MainPage from './page/MainPage.vue';
import VDatePicker from 'v-calendar';
import Layout2 from './page/Layout2';
// Use v-calendar & v-date-picker components
Vue.use(VDatePicker, {
  componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
});

export default {
  name: 'App',
  components: {
    Layout2,
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
