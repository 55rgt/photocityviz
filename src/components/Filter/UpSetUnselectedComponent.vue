<template lang="pug">
  .upset-unselected-container
    .upset-unselected-filter-container
    .upset-unselected-list-container
      .upset-unselected-item-container(v-for="key in Object.keys(labelCount)")
</template>

<script>
export default {
  name: 'UpSetUnselectedComponent',
  data() {
    return {
      labelCount: this.$store.getters.getLabelCount
    };
  },
  mounted() {
    let that = this;
    console.log(that.labelCount);

  }
};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.upset-unselected-container
  width: auto
  height: $upset-unselected-container-height
  display: flex
  .upset-unselected-filter-container
    width: 120px
    height: 100%
    border: 1px solid black
  .upset-unselected-list-container
    width: auto
    height: 100%
    display: flex
    overflow-x: scroll
    .upset-unselected-item-container
      width: 32px
      height: 100%
      border: 1px solid black
.d
</style>
