<template lang="pug">
  .nav-cluster-container
    .component-header Cluster:
      select.component-input(@change="onChange($event)")
        // option(value="" disabled="disabled") Select Clusters..
        option(value="kmeans_12") kmeans_12
</template>

<script>
export default {
  name: 'NavClusterComponent',
  methods: {
    onChange(e) {
      console.log(e.target.value);
    }
  }
};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.nav-cluster-container
  width: 100%
  height: auto
  .component-header
    position: relative
    .component-input
      position: absolute
      left: 76px
      top: 12px
      height: 20px
      width: 100px
      padding-left: 6px
      line-height: 12px
      text-align: center
      outline: none
      color: #4e4e4e
      font-size: $unit-2
      border: 1px solid #8f8f8f

</style>
