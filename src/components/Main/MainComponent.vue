<template lang="pug">
  .main-container
    .component-header Cluster: {{ clusterName }}
    .component-body
      HexMapComponent
</template>

<script>
import HexMapComponent from './HexMapComponent';
export default {
  name: 'MainComponent',
  components: { HexMapComponent },
  data() {
    return {
      clusterName: this.$store.getters.getSelectedClusterName
    }
  }
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/styles"

.main-container
  flex: 1
  background: $md-white
  @include box_shadow
</style>
