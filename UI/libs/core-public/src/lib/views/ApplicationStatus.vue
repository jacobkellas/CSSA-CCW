<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue-a11y/no-autofocus -->
<template>
  <div class="applications-table">
    <v-data-table
      :headers="state.headers"
      :items="state.applications"
      item-key="orderId"
      item-class="rowClass"
      :loading="isLoading && !isError"
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
          {{ props.item.history[-1].changeDateTimeUtc.toLocaleTimeString() }}
        </span>
        <span v-else>
          {{ $t('No history present') }}
        </span>
      </template>
      <template #item.completed="props">
        <v-icon
          v-if="props.item.application.isComplete"
          medium
          color="green"
        >
          mdi-check-cirle
        </v-icon>
        <v-icon
          color="error"
          medium
          v-else
        >
          mdi-alert-octagon
        </v-icon>
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
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useAuthStore } from '@shared-ui/stores/auth';
import { useCompleteApplicationStore } from '@core-public/stores/completeApplication';
import { useQuery } from '@tanstack/vue-query';
import { CompleteApplication } from '@shared-utils/types/defaultTypes';

const { getAllUserApplications, setCompleteApplication } =
  useCompleteApplicationStore();
const authStore = useAuthStore();

const state = reactive({
  applications: [] as Array<CompleteApplication>,
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
  });
});

function handleSelection(application) {
  // TODO: Route this to the detail view after create the abiltify to create a application on this page.
  setCompleteApplication(application);
}
</script>
