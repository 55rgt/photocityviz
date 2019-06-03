<template lang="pug">
  .upset-checkbox-container
    .upset-month-container
    .upset-country-container
</template>

<script>
export default {
  name: 'UpSetCheckboxComponent'
};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.upset-checkbox-container
  width: auto
  height: $upset-checkbox-container-height
  display: flex
  .upset-month-container
    width: $upset-month-container-width
    height: 100%
    border: 1px solid black
  .upset-country-container
    border: 1px solid black
    width: $upset-country-container-width
    height: 100%
</style>
