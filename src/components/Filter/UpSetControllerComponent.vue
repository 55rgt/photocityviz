<template lang="pug">
  .upset-controller-container
    UpSetUnselectedComponent
    UpSetCheckboxComponent
</template>

<script>
import UpSetUnselectedComponent from './UpSetUnselectedComponent';
import UpSetCheckboxComponent from './UpSetCheckboxComponent';
export default {
  name: 'UpSetControllerComponent',
  components: { UpSetCheckboxComponent, UpSetUnselectedComponent }
};
</script>

<style scoped lang="sass">
.upset-controller-container
  width: auto
  height: 100%
  flex: 0 0 auto
</style>
