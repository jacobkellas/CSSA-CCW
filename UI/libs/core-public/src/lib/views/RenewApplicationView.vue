<template>
  <div class="application">
    <img
      v-if="store.getBrand.agencyLogoDataURL"
      alt="Application logo"
      :src="store.getBrand.agencyLogoDataURL"
    />
    <v-container v-if="!state.selected">
      <v-sheet>
        <v-row>
          <v-col
            lg="5"
            sm="1"
          >
            <v-container v-if="isLoading">
              <v-skeleton-loader
                fluid
                type="list-item"
              >
              </v-skeleton-loader>
            </v-container>
            <v-list v-else>
              <v-list-item v-if="state.applications.length === 0">
                <v-list-item-content>
                  {{
                    $t(
                      ' No previously completed applications. Please go to back to new applications'
                    )
                  }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                v-for="app in state.applications"
                :key="app"
                v-else
              >
                {{ app.application.userEmail }}
              </v-list-item>
            </v-list>
          </v-col>
          <v-col
            lg="4"
            sm="1"
          >
            <v-btn @click="handleModifyApplication">
              {{ $t(' Modify Application') }}
            </v-btn>
            <v-btn @click="handleRenewApplication">
              {{ $t(' Create Renewal Application') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>
    <AcknowledgementContainer
      v-if="state.selected"
      :next-route="'/renew-form'"
    />
  </div>
</template>

<script setup lang="ts">
import { useBrandStore } from '@core-public/stores/brandStore';
import AcknowledgementContainer from '@core-public/components/containers/AcknowledgementContainer.vue';
import { reactive } from 'vue';
import { useCompleteApplicationStore } from '@core-public/stores/completeApplication';
import { useApplicationTypeStore } from '@core-public/stores/applicationTypeStore';
import { useAuthStore } from '@shared-ui/stores/auth';
import { useQuery } from '@tanstack/vue-query';
import { createNewApplication } from '@core-public/senders/applicationSenders';

const store = useBrandStore();
const applicationStore = useCompleteApplicationStore();
const applicationTypeStore = useApplicationTypeStore();
const authStore = useAuthStore();

const state = reactive({
  selected: false,
  applications: [] as Array<any>,
});

const { isLoading } = useQuery(['getCompleteApplications'], () => {
  const res = applicationStore.getCompleteApplicationFromApi(
    authStore.auth.userEmail,
    true
  );

  res.then(data => (state.applications = data));
});

async function handleModifyApplication() {
  applicationTypeStore.state.type = 'modify';
  applicationStore.completeApplication = state.applications[0].application;
  state.selected = true;
}

async function handleRenewApplication() {
  applicationTypeStore.state.type = 'renewal';
  applicationStore.completeApplication.userEmail = authStore.auth.userEmail;

  const res = await createNewApplication(
    applicationStore.completeApplication,
    'Created Renewal Application',
    authStore.auth.userEmail
  );

  if (res) {
    applicationStore.completeApplication.id = res;
  }

  state.selected = true;
}
</script>

<style lang="scss" scoped>
img {
  max-width: 30%;
  margin-top: 20px;
}
</style>
