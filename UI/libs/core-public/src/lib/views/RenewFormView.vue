<template>
  <div>
    <v-container
      v-if="isLoading"
      fluid
    >
      <v-skeleton-loader fluid />
    </v-container>
    <v-container
      v-else
      fluid
    >
      <RenewFormContainer />
    </v-container>
  </div>
</template>

<script setup lang="ts">
import RenewFormContainer from '@core-public/components/containers/RenewFormContainer.vue';
</script>
