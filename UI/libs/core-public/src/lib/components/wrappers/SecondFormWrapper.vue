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
      v-else
      class="rounded elevation-2 form-card"
      :class="{ 'dark-card': $vuetify.theme.dark }"
    >
      <v-stepper
        alt-labels
        v-model="stepIndex.step"
      >
        <FormStepHeader
          :previous-index="stepIndex.previousStep"
          :starting-step="6"
          :step-index="stepIndex.step"
          :step-names="formTwoStepName"
        />
        <FormSecondStepItems
          :step-index="stepIndex.step"
          :handle-next-section="handleNextSection"
          :handle-previous-section="handlePreviousSection"
        />
      </v-stepper>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import FormStepHeader from '@core-public/components/form-stepper/FormStepHeader.vue';
import FormSecondStepItems from '@core-public/components/form-stepper/FormSecondStepItems.vue';
import { formTwoStepName } from '@shared-utils/lists/defaultConstants';
import { onMounted, reactive } from 'vue';
import { useAuthStore } from '@shared-ui/stores/auth';
import { useCompleteApplicationStore } from '@core-public/stores/completeApplication';
import { useQuery } from '@tanstack/vue-query';

const applicationStore = useCompleteApplicationStore();
const authStore = useAuthStore();

const stepIndex = reactive({
  step: 6,
  previousStep: 5,
});

onMounted(() => {
  stepIndex.step = applicationStore.completeApplication.application.currentStep;
});

const { isLoading } = useQuery(['getIncompleteApplication'], () => {
  if (!applicationStore.completeApplication.id) {
    stepIndex.step = 5;
    const res = applicationStore.getCompleteApplicationFromApi(
      authStore.auth.userEmail,
      false
    );

    res.then(data => {
      applicationStore.setCompleteApplication(data);
      stepIndex.step =
        applicationStore.completeApplication.application.currentStep;
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
