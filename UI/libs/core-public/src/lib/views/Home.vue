<template>
  <div class="home">
    <!-- TODO: Make this the custom logo -->

    <v-container>
      <router-link :to="{ path: '/application' }">
        <Button
          color="primary"
          text="NEW Concealed Carry Weapon License"
        >
        </Button>
      </router-link>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import Button from '@shared-ui/components/Button.vue';</script>
