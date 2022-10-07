<template>
  <v-text-field
    :label="$t('Brand Title')"
    :rules="[v => !!v || 'Brand Title is required']"
    v-model="state.brandTitle"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
  brandTitle: '',
});
</script>
