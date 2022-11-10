<template>
  <div>
    <v-container v-if="isLoading">
      <v-skeleton-loader
        fluid
        class="fill-height"
        type="list-item"
      >
      </v-skeleton-loader>
    </v-container>
    <v-container>
      <ApplicationStatusContainer />
    </v-container>
  </div>
</template>

<script setup lang="ts">
import ApplicationStatusContainer from '@core-public/components/containers/ApplicationStatusContainer.vue';
import { useAuthStore } from '@shared-ui/stores/auth';
import { useCompleteApplicationStore } from '@core-public/stores/completeApplication';
import { useQuery } from '@tanstack/vue-query';

const applicationStore = useCompleteApplicationStore();
const authStore = useAuthStore();

const { isLoading } = useQuery(['getCompleteApplications'], () => {
  const res = applicationStore.getCompleteApplicationFromApi(
    authStore.auth.userEmail,
    true
  );

  res.then(data => {
    applicationStore.setCompleteApplication(data);
  });
});
</script>
