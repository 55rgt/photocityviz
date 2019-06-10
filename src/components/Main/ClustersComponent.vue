<template lang="pug">
  .clusters-container
    ClusterComponent(v-for="n in length" :id="'labelDist_' + n" :index="n")
</template>

<script>
import ClusterComponent from './ClusterComponent';
export default {
  name: 'ClustersComponent',
  components: { ClusterComponent },
  data() {
    return {
      length: this.$store.getters.getSelectedClusterLength
    }
  },
};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.clusters-container
  width: 100%
  height: 100%
  padding-bottom: $unit-3
  display: flex
  flex-wrap: wrap
  overflow-y: scroll
.clusters-container::-webkit-scrollbar
  display: none
  width: 0
  background: transparent

</style>
