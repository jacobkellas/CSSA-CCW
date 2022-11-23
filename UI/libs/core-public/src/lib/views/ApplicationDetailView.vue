<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue-a11y/no-autofocus -->
<template>
  <div>
    <v-row class="mt-5">
      <v-col
        cols="12"
        lg="8"
      >
        <v-data-table
          :headers="state.headers"
          :items="state.application"
          item-key="orderId"
          item-class="rowClass"
          :loading="!applicationStore.completeApplication"
          :loading-text="$t('Loading applications')"
          hide-default-footer
        >
          <template #item.orderId="props">
            <span>
              {{ props.item.application.orderId }}
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
          <template #item.step="props">
            {{ props.item.application.currentStep }}
          </template>
          <template #item.type="props">
            {{ props.item.application.applicationType }}
          </template>
        </v-data-table>
        <v-container>
          <v-sheet class="rounded">
            <v-timeline dense>
              <v-timeline-item
                v-for="history in applicationStore.completeApplication.history"
                :key="history.changeDateTimeUtc"
                color="accent"
                small
              >
                <ul class="text-left">
                  <li>{{ history.change }}</li>
                  <li>
                    {{ new Date(history.changeDateTimeUtc).toLocaleString() }}
                  </li>
                  <li>{{ history.changeMadeBy }}</li>
                </ul>
              </v-timeline-item>
            </v-timeline>
          </v-sheet>
        </v-container>
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
        <v-card>
          <v-card-text>
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  small
                  color="info"
                  :disabled="
                    applicationStore.completeApplication.application.isComplete
                  "
                  v-bind="attrs"
                  v-on="on"
                  @click="router.push(Routes.APPLICATION_ROUTE_PATH)"
                >
                  {{ $t('Continue Application') }}
                </v-btn>
              </template>
              <span>{{
                $t(' You can only continue incomplete applications.')
              }}</span>
            </v-tooltip>
          </v-card-text>
          <v-card-text>
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  small
                  color="info"
                  :disabled="
                    !applicationStore.completeApplication.application.isComplete
                  "
                  v-bind="attrs"
                  v-on="on"
                  @click="router.push(Routes.RENEW_APPLICATION_ROUTE_PATH)"
                >
                  {{ $t('Modify Application') }}
                </v-btn>
              </template>
              <span>
                {{
                  $t(` With modify make sure to change anything that need to be changed. Then make sure to
                    check the correct application type in step 7 `)
                }}
              </span>
            </v-tooltip>
          </v-card-text>
          <v-card-text>
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  small
                  color="info"
                  :disabled="
                    !applicationStore.completeApplication.application.isComplete
                  "
                  v-bind="attrs"
                  v-on="on"
                  @click="handlRenewApplication"
                >
                  {{ $t('Renew Application') }}
                </v-btn>
              </template>
              <span>
                {{
                  $t(` With modify make sure to change anything that need to be changed. Then make sure to
                    check the correct application type in step 7 `)
                }}
              </span>
            </v-tooltip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useCompleteApplicationStore } from '@shared-ui/stores/completeApplication';
import { useRouter } from 'vue-router/composables';
import Routes from '@core-public/router/routes';
import { reactive } from 'vue';
import { useApplicationTypeStore } from '@core-public/stores/applicationTypeStore';
import { useMutation } from '@tanstack/vue-query';

const applicationStore = useCompleteApplicationStore();
const applicationTypeStore = useApplicationTypeStore();
const router = useRouter();

const state = reactive({
  application: [applicationStore.completeApplication],
  headers: [
    {
      text: 'ORDER ID',
      align: 'start',
      sortable: false,
      value: 'orderId',
    },
    {
      text: 'COMPLETED',
      value: 'completed',
    },
    {
      text: 'CURRENT STEP',
      value: 'step',
    },
    {
      text: 'APPLIACATION TYPE',
      value: 'type',
    },
  ],
});
const createMutation = useMutation({
  mutationFn: applicationStore.createApplication,
  onSuccess: () => {
    router.push(Routes.RENEW_APPLICATION_ROUTE_PATH);
  },
  onError: error => {},
});

function handlRenewApplication() {
  applicationTypeStore.state.type = 'renew';
  applicationStore.completeApplication.id = window.crypto.randomUUID();
  applicationStore.completeApplication.application.currentStep = 1;
  createMutation.mutate();
}
</script>

<style scoped lang="scss"></style>
