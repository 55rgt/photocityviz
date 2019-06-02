<template lang="pug">
  .cluster-container

</template>

<script>
export default {
  name: 'ClusterComponent'
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/styles"
.cluster-container
  width: $cluster-container-width
  height: 100%
  margin-right: $cluster-container-margin-right
  @include box_shadow
  background: $md-white

</style>
