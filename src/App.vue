<template lang="pug">
  .v-app#app
    Layout
</template>

<script>
import Layout from './page/Layout';

export default {
  name: 'App',
  components: {
    Layout
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
