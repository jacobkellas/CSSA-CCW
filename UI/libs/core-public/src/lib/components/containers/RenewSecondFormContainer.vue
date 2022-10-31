<template>
  <v-container
    fluid
    class="blue-grey lighten-3 elevation-3 rounded form-container"
  >
    <RenewSecondFormWrapper />
  </v-container>
</template>

<script setup lang="ts">
import RenewSecondFormWrapper from '@core-public/components/wrappers/RenewSecondFormWrapper.vue';
</script>

<style lang="scss">
.form-container {
  min-height: 50%;
}
</style>
