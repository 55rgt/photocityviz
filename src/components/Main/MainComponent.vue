<template lang="pug">
  .main-container
    .component-header Cluster: {{ clusterName }}
    .component-body
      Hex_
      //ClustersComponent
</template>

<script>
import ClustersComponent from './ClustersComponent';
import Hex_ from './Hex_';
export default {
  name: 'MainComponent',
  components: { Hex_, ClustersComponent },
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
