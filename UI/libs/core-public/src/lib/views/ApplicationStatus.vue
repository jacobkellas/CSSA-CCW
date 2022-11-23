<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue-a11y/no-autofocus -->
<template>
  <div class="applications-table mt-5">
    <v-row>
      <v-col
        cols="12"
        lg="8"
      >
        <v-data-table
          :headers="state.headers"
          :items="state.applications"
          item-key="orderId"
          item-class="rowClass"
          :loading="isLoading && state.dataLoaded && !isError"
          :loading-text="$t('Loading user applications')"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus',
          }"
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title> {{ $t('Applications') }}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template #item.orderId="props">
            <v-btn
              color="accent"
              small
              text
              @click="handleSelection(props.item)"
            >
              {{ props.item.application.orderId }}
            </v-btn>
          </template>
          <template #item.updated="props">
            <span v-if="props.item.history[-1]">
              {{
                props.item.history[-1].changeDateTimeUtc.toLocaleTimeString()
              }}
            </span>
            <span v-else>
              {{ $t('No history present') }}
            </span>
          </template>
          <template #item.completed="props">
            <div v-if="props.item.application.isComplete">
              <v-icon
                medium
                color="green"
              >
                mdi-check-circle
              </v-icon>
              <span class="ml-3">{{ $t('Completed') }}</span>
            </div>
            <div v-else>
              <v-icon
                color="error"
                medium
              >
                mdi-alert-octagon
              </v-icon>
              <span class="ml-3">{{ $t('Not Completed') }}</span>
            </div>
          </template>
          <template #item.appointmentStatus="props">
            <v-chip
              small
              color="error"
              v-if="!props.item.application.appointmentStatus"
            >
              {{ $t('Not scheduled') }}
            </v-chip>
            <v-chip
              v-else
              small
              color="accent"
            >
              {{ $t('Scheduled') }}
            </v-chip>
          </template>
          <template #item.status="props">
            <v-chip
              small
              color="warning"
              v-if="props.item.application.status === 1"
            >
              {{ $t('Started') }}
            </v-chip>
            <v-chip
              v-if="props.item.application.status === 2"
              small
              color="accent"
            >
              {{ $t('Submitted') }}
            </v-chip>
            <v-chip
              v-if="props.item.application.status === 3"
              small
              color="primary"
            >
              {{ $t('In Progress') }}
            </v-chip>
            <v-chip
              v-if="props.item.application.status === 4"
              small
              color="error"
            >
              {{ $t('Cancelled') }}
            </v-chip>
            <v-chip
              v-if="props.item.application.status === 5"
              small
              color="warning"
            >
              {{ $t('Cancelled') }}
            </v-chip>
            <v-chip
              v-if="props.item.application.status === 6"
              small
              color="success"
            >
              {{ $t('Complete') }}
            </v-chip>
          </template>
        </v-data-table>
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
        <v-card>
          <v-card-text>
            <v-btn
              small
              color="accent"
              @click="handleCreateApplication"
            >
              {{ $t('Create Application') }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { CompleteApplication } from '@shared-utils/types/defaultTypes';
import Routes from '@core-public/router/routes';
import { reactive } from 'vue';
import { useApplicationTypeStore } from '@core-public/stores/applicationTypeStore';
import { useAuthStore } from '@shared-ui/stores/auth';
import { useCompleteApplicationStore } from '@shared-ui/stores/completeApplication';
import { useRouter } from 'vue-router/composables';
import { useMutation, useQuery } from '@tanstack/vue-query';

const {
  getAllUserApplications,
  setCompleteApplication,
  createApplication,
  completeApplication,
} = useCompleteApplicationStore();
const applicationTypeStore = useApplicationTypeStore();
const authStore = useAuthStore();

const router = useRouter();

const state = reactive({
  applications: [] as Array<CompleteApplication>,
  dataLoaded: false,
  search: '',
  headers: [
    {
      text: 'ORDER ID',
      align: 'start',
      sortable: false,
      value: 'orderId',
    },
    { text: 'LAST UPDATED', value: 'updated' },
    { text: 'COMPLETED', value: 'completed' },
    { text: 'CURRENT STATUS', value: 'status' },
    { text: 'APPOINTMENT STATUS', value: 'appointmentStatus' },
  ],
});

const { isLoading, isError } = useQuery(['getApplicationsByUser'], () => {
  getAllUserApplications(authStore.auth.userEmail).then(data => {
    state.applications = data;
    state.dataLoaded = true;
  });
});

const createMutation = useMutation({
  mutationFn: createApplication,
  onSuccess: () => {
    router.push(Routes.APPLICATION_ROUTE_PATH);
  },
  onError: error => {},
});

function handleSelection(application) {
  setCompleteApplication(application);
  router.push(Routes.APPLICATION_DETAIL_ROUTE);
}

async function handleCreateApplication() {
  applicationTypeStore.state.type = 'new';
  completeApplication.application.userEmail = authStore.auth.userEmail;
  completeApplication.id = window.crypto.randomUUID();
  completeApplication.application.currentStep = 1;
  createMutation.mutate();
}
</script>
