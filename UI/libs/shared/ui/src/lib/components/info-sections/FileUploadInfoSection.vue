<template>
  <v-container
    fluid
    class="info-section-container rounded"
  >
    <v-banner class="sub-header font-weight-bold text-left my-5 pl-0">
      {{ $t('File Upload Information') }}
      <template #actions>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              @click="handleEditRequest"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="info"> mdi-square-edit-outline </v-icon>
            </v-btn>
          </template>
          {{ $t('Edit Section') }}
        </v-tooltip>
      </template>
    </v-banner>
    <v-row>
      <v-col
        cols="12"
        lg="12"
      >
        <v-banner
          rounded
          single-line
          class="text-left"
        >
          <v-icon
            left
            color="accent"
          >
            mdi-file
          </v-icon>
          <strong>
            {{ $t(' Uploaded Files: ') }}
          </strong>
          <v-chip
            v-for="(file, index) in applicationStore.completeApplication
              .application.uploadedDocuments"
            :key="index"
            color="info"
            small
            class="ml-2"
          >
            {{ file.documentType }}
          </v-chip>
        </v-banner>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useCompleteApplicationStore } from '@shared-ui/stores/completeApplication';
import { useRouter } from 'vue-router/composables';

const router = useRouter();
const applicationStore = useCompleteApplicationStore();

function handleEditRequest() {
  applicationStore.completeApplication.application.currentStep = 8;
  router.push({
    path: '/form',
    query: {
      applicationId: applicationStore.completeApplication.id,
      isComplete: applicationStore.completeApplication.application.isComplete,
    },
  });
}
</script>

<style lang="scss" scoped>
.info-section-container {
  width: 80%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.info-row {
  display: flex;
  flex-direction: row;
  max-height: 2vh;
  min-height: 1vh;
  margin-left: 0.5rem;
}

.info-text {
  margin-left: 0.5rem;
  text-align: start;
  height: 1.8em;
  width: 50%;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  background-color: rgba(211, 241, 241, 0.3);
  border-bottom: 1px solid #666;
  border-radius: 5px;
  font-size: 1.2em;
  font-weight: bold;
}
</style>
