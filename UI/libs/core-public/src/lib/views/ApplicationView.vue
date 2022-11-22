<template>
  <div class="application">
    <img
      v-if="store.getDocuments.agencyLogo"
      alt="Application logo"
      :src="store.getDocuments.agencyLogo"
    />
    <AcknowledgementContainer :next-route="Routes.FORM_ROUTE_PATH" />
  </div>
</template>

<script setup lang="ts">
import AcknowledgementContainer from '@core-public/components/containers/AcknowledgementContainer.vue';
import Routes from '@core-public/router/routes';
import { CompleteApplication } from '@shared-utils/types/defaultTypes';
import { reactive } from 'vue';
import { useApplicationTypeStore } from '@core-public/stores/applicationTypeStore';
import { useAuthStore } from '@shared-ui/stores/auth';
import { useBrandStore } from '@core-public/stores/brandStore';
import { useCompleteApplicationStore } from '@core-public/stores/completeApplication';
import { useMutation, useQuery } from '@tanstack/vue-query';

const applicationTypeStore = useApplicationTypeStore();
const store = useBrandStore();
const applicationStore = useCompleteApplicationStore();
const authStore = useAuthStore();

const state = reactive({
  selected: false,
  applications: [] as Array<CompleteApplication>,
  showApplications: false,
});

const { isLoading, isError } = useQuery(['getIncompleteApplications'], () => {
  const res = applicationStore.getCompleteApplicationFromApi(
    authStore.auth.userEmail,
    false
  );

  res
    .then(data => {
      state.applications.push(data);
      state.showApplications = true;
    })
    .catch(err => {
      window.console.log(err);
      state.showApplications = true;
    });
});

const createMutation = useMutation({
  mutationFn: applicationStore.createApplication,
  onSuccess: () => {
    state.selected = true;
  },
  onError: error => {
    alert(error);
  },
});

async function handleCreateApplication() {
  applicationTypeStore.state.type = 'new';
  applicationStore.completeApplication.application.userEmail =
    authStore.auth.userEmail;
  applicationStore.completeApplication.id = window.crypto.randomUUID();
  applicationStore.completeApplication.application.currentStep = 1;
  createMutation.mutate();
}

function handleSelectedApplication(selected: CompleteApplication) {
  applicationStore.setCompleteApplication(selected);
  state.selected = true;
}
</script>

<style lang="scss" scoped>
img {
  max-width: 30%;
  margin-top: 20px;
}
.selections {
  width: 100%;
}

.button-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
