<template lang="pug">
  .main-container
    .component-header Cluster: {{ clusterName }}
    .component-body
</template>

<script>
export default {
  name: 'MainComponent',
  components: { },
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
