<template lang="pug">
  .v-app#app
    Wrapper
</template>

<script>
import Layout from './page/Layout';
import Wrapper from './page/Wrapper';

export default {
  name: 'App',
  components: {
    Wrapper,
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
