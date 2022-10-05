<template>
  <TextInput
    :label="'Brand Title '"
    :target="'brandTitle'"
    :rules="[v => !!v || 'Brand Title is required']"
    :name="'brandTitle'"
  />
</template>

<script setup lang="ts">
import TextInput from '@shared-ui/components/inputs/TextInput.vue';
</script>
