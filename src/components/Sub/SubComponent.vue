<template lang="pug">
  .sub-container
    LabelsComponent
    ClusterComponent
</template>

<script>
import LabelsComponent from '../Sub/LabelsComponent';
import ClusterComponent from '../Sub/ClusterComponent';
export default {
  name: 'SubComponent',
  components: { ClusterComponent, LabelsComponent }
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/styles"
.sub-container
  width: $sub-container-width
  height: 100%
  margin-left: $unit-2

</style>
