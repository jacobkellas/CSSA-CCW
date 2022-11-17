<template>
  <div>
    <v-container v-if="isLoading">
      <v-skeleton-loader
        fluid
        class="fill-height"
        type=" list-item"
      />
    </v-container>
    <v-card
      v-if="!isLoading"
      class="rounded elevation-2 form-card"
      :class="{ 'dark-card': $vuetify.theme.dark }"
    >
      <v-stepper
        alt-labels
        v-model="stepIndex.step"
      >
        <FormStepHeader
          :previous-index="stepIndex.previousStep"
          :starting-step="1"
          :step-index="stepIndex.step"
          :step-names="formOneStepNames"
          :small-size="size"
        />
        <FormStepItems
          :step-index="stepIndex.step"
          :handle-next-section="handleNextSection"
          :handle-previous-section="handlePreviousSection"
          :handle-reset="handleResetForm"
        />
      </v-stepper>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import FormStepHeader from '../form-stepper/FormStepHeader.vue';
import FormStepItems from '../form-stepper/FormStepItems.vue';
import Routes from '@core-public/router/routes';
import { formOneStepNames } from '@shared-utils/lists/defaultConstants';
import { unformatNumber } from '@shared-utils/formatters/defaultFormatters';
import { useAuthStore } from '@shared-ui/stores/auth';
import { useCompleteApplicationStore } from '@core-public/stores/completeApplication';
import { useQuery } from '@tanstack/vue-query';
import { useRouter } from 'vue-router/composables';
import { getCurrentInstance, onMounted, reactive } from 'vue';

const applicationStore = useCompleteApplicationStore();
const authStore = useAuthStore();
const router = useRouter();
const app = getCurrentInstance();

const size =
  !app?.proxy.$vuetify.breakpoint.md &&
  !app?.proxy.$vuetify.breakpoint.lg &&
  !app?.proxy.$vuetify.breakpoint.xl;

const stepIndex = reactive({
  step: 1,
  previousStep: 0,
});

onMounted(() => {
  stepIndex.step = applicationStore.completeApplication.application.currentStep;
  checkForCorrectForm();
});

const { isLoading } = useQuery(['getIncompleteApplications'], () => {
  if (!applicationStore.completeApplication.id) {
    stepIndex.step = 0;
    const res = applicationStore.getCompleteApplicationFromApi(
      authStore.auth.userEmail,
      false
    );

    res.then(data => {
      data.application.contact.primaryPhoneNumber = unformatNumber(
        data.application.contact.primaryPhoneNumber
      );
      data.application.contact.cellPhoneNumber = unformatNumber(
        data.application.contact.cellPhoneNumber
      );
      data.application.contact.workPhoneNumber = unformatNumber(
        data.application.contact.workPhoneNumber
      );
      data.application.contact.faxPhoneNumber = unformatNumber(
        data.application.contact.faxPhoneNumber
      );
      data.application.personalInfo.ssn = unformatNumber(
        data.application.personalInfo.ssn
      );

      applicationStore.setCompleteApplication(data);
      stepIndex.step =
        applicationStore.completeApplication.application.currentStep;
      checkForCorrectForm();
    });
  }
});

function handleNextSection() {
  stepIndex.previousStep = stepIndex.step;
  stepIndex.step += 1;
}

function handlePreviousSection() {
  stepIndex.previousStep = stepIndex.step - 2;
  stepIndex.step -= 1;
}

function handleResetForm() {
  stepIndex.step = 1;
}

function checkForCorrectForm() {
  if (applicationStore.completeApplication.application.currentStep > 5) {
    router.push(Routes.FORM_TWO_ROUTE_PATH);
  }
}
</script>

<style lang="scss" scoped>
.form-card {
  height: auto;
  min-height: 45vh;
}

.dark-card {
  background: #455a64;
}
</style>
