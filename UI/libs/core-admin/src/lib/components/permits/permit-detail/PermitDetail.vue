<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2 basil--text">
        {{ $t('BASiL') }}
      </h1>
    </v-card-title>
    <v-tabs
      v-model="state.tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in state.items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="state.tab">
      <v-tab-item
        v-for="item in state.items"
        :key="item"
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text>{{ state.text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { usePermitsStore } from '@core-admin/stores/permitsStore';
import { useQuery } from '@tanstack/vue-query';
import { onBeforeRouteUpdate, useRoute } from 'vue-router/composables';

const { getPermitDetailApi } = usePermitsStore();
const route = useRoute();

const { data } = useQuery(['permitDetail', route.params.orderId], () =>
  getPermitDetailApi(route.params.orderId)
);

const state = reactive({
  tab: null,
  items: ['Appetizers', 'Entrees', 'Deserts', 'Cocktails'],
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
});

window.console.log(data);

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.orderId !== from.params.orderId) {
    window.console.log('New application call here');
  }
});
</script>
<style lang="scss">
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}

.basil--text {
  color: #356859 !important;
}
</style>
