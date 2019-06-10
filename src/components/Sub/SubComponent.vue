<template lang="pug">
  .sub-container
    // Hex_
    ClusterComponent
</template>

<script>
import ClusterComponent from '../Sub/ClusterComponent';
import Hex_ from '../Main/Hex_';
import LabelsComponent from './LabelsComponent';
export default {
  name: 'SubComponent',
  components: { LabelsComponent, Hex_, ClusterComponent }
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
