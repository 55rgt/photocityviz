<template lang="pug">
  .filter-wrapper
    ClusterComponent
    UpSetComponent

</template>

<script>
import ClusterComponent from './ClusterComponent';
import UpSetComponent from './UpSetComponent';
export default {
  name: 'FilterComponent',
  components: { UpSetComponent, ClusterComponent }
};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.filter-wrapper
  width: 100%
  height: $filter-wrapper-height
  margin-bottom: $filter-margin-bottom
  display: flex

</style>
