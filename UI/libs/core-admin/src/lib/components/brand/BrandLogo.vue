<template>
  <div>
    <v-row class="ml-5">
      <v-col
        cols="6"
        md="5"
        sm="3"
      >
        <FileInput
          :label="'Brand Logo '"
          :rules="[v => !!v || 'Brand Logo is required']"
          :name="'brandLogo'"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import FileInput from '@shared-ui/components/inputs/FileInput.vue';
</script>
