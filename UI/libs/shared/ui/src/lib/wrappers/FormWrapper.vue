<template>
  <div class="text-left">
    <v-container v-if="isLoading">
      <v-skeleton-loader
        fluid
        class="fill-height"
        type=" list-item"
      />
    </v-container>
    <v-container
      v-if="!isLoading"
      fluid
    >
      <v-stepper
        vertical
        v-model="stepIndex.step"
      >
        <v-stepper-step
          :color="$vuetify.theme.dark ? 'info' : 'primary'"
          step="1"
        >
          {{ $t('Personal') }}
        </v-stepper-step>
        <v-stepper-content step="1">
          <FormStepOne
            v-if="stepIndex.step === 1"
            :handle-next-section="handleNextSection"
          />
        </v-stepper-content>

        <v-stepper-step
          :color="$vuetify.theme.dark ? 'info' : 'primary'"
          step="2"
          :complete="stepIndex.step > 2"
        >
          {{ $t('Citizenship') }}
        </v-stepper-step>
        <v-stepper-content step="2">
          <FormStepTwo
            v-if="stepIndex.step === 2"
            :handle-next-section="handleNextSection"
            :handle-previous-section="handlePreviousSection"
          />
        </v-stepper-content>

        <v-stepper-step
          :color="$vuetify.theme.dark ? 'info' : 'primary'"
          step="3"
          :complete="stepIndex.step > 3"
        >
          {{ $t('Address') }}
        </v-stepper-step>
        <v-stepper-content step="3">
          <FormStepThree
            v-if="stepIndex.step === 3"
            :handle-next-section="handleNextSection"
            :handle-previous-section="handlePreviousSection"
          />
        </v-stepper-content>

        <v-stepper-step
          :color="$vuetify.theme.dark ? 'info' : 'primary'"
          step="4"
          :complete="stepIndex.step > 4"
        >
          {{ $t('Appearance') }}
        </v-stepper-step>
        <v-stepper-content step="4">
          <FormStepFour
            v-if="stepIndex.step === 4"
            :handle-next-section="handleNextSection"
            :handle-previous-section="handlePreviousSection"
          />
        </v-stepper-content>

        <v-stepper-step
          :color="$vuetify.theme.dark ? 'info' : 'primary'"
          step="5"
          :complete="stepIndex.step > 5"
        >
          {{ $t('Contact') }}
        </v-stepper-step>
        <v-stepper-content step="5">
          <FormStepFive
            v-if="stepIndex.step === 5"
            :handle-next-section="handleNextSection"
            :handle-previous-section="handlePreviousSection"
          />
        </v-stepper-content>
        <v-stepper-step
          step="6"
          :color="$vuetify.theme.dark ? 'info' : 'primary'"
          :complete="stepIndex.step > 6"
        >
          {{ $t(' Employment & Weapons') }}
        </v-stepper-step>
        <v-stepper-content step="6">
          <SecondFormStepOne
            v-if="stepIndex.step === 6"
            :routes="routes"
            :handle-next-section="handleNextSection"
            :handle-previous-section="handlePreviousSection"
          />
        </v-stepper-content>

        <v-stepper-step
          step="7"
          :color="$vuetify.theme.dark ? 'info' : 'primary'"
          :complete="stepIndex.step > 7"
        >
          {{ $t('Application Type') }}
        </v-stepper-step>
        <v-stepper-content step="7">
          <SecondFormStepThree
            v-if="stepIndex.step === 7"
            :handle-next-section="handleNextSection"
            :handle-previous-section="handlePreviousSection"
          />
        </v-stepper-content>

        <v-stepper-step
          step="8"
          :color="$vuetify.theme.dark ? 'info' : 'primary'"
          :complete="stepIndex.step > 8"
        >
          {{ $t(' Upload Files') }}
        </v-stepper-step>
        <v-stepper-content step="8">
          <SecondFormStepTwo
            v-if="stepIndex.step === 8"
            :handle-next-section="handleNextSection"
            :handle-previous-section="handlePreviousSection"
          />
        </v-stepper-content>

        <v-stepper-step
          step="9"
          :color="$vuetify.theme.dark ? 'info' : 'primary'"
          :complete="stepIndex.step > 9"
        >
          {{ $t('Signature') }}
        </v-stepper-step>
        <v-stepper-content step="9">
          <SecondFormStepFour
            v-if="stepIndex.step === 9"
            :routes="routes"
            :handle-next-section="handleNextSection"
            :handle-previous-section="handlePreviousSection"
          />
        </v-stepper-content>
      </v-stepper>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import FormStepOne from '@shared-ui/components/form-stepper/form-steps/PersonalInfoStep.vue';
import FormStepTwo from '@shared-ui/components/form-stepper/form-steps/IdBirthInfoStep.vue';
import FormStepThree from '@shared-ui/components/form-stepper/form-steps/AddressInfoStep.vue';
import FormStepFour from '@shared-ui/components/form-stepper/form-steps/PhysicalAppearanceStep.vue';
import FormStepFive from '@shared-ui/components/form-stepper/form-steps/ContactStep.vue';
import SecondFormStepOne from '@shared-ui/components/form-stepper/form-steps/WorkInfoStep.vue';
import SecondFormStepTwo from '@shared-ui/components/form-stepper/form-steps/FileUploadStep.vue';
import SecondFormStepThree from '@shared-ui/components/form-stepper/form-steps/ApplicationTypeStep.vue';
import SecondFormStepFour from '@shared-ui/components/form-stepper/form-steps/SignatureStep.vue';
import { useAuthStore } from '@shared-ui/stores/auth';
import { useCompleteApplicationStore } from '@shared-ui/stores/completeApplication';
import { useQuery } from '@tanstack/vue-query';
import { onMounted, reactive } from 'vue';

interface IWrapperProps {
  admin: boolean;
  routes: any;
}

const props = defineProps<IWrapperProps>();

const applicationStore = useCompleteApplicationStore();
const authStore = useAuthStore();

const stepIndex = reactive({
  step: 1,
  previousStep: 0,
});

onMounted(() => {
  stepIndex.step = applicationStore.completeApplication.application.currentStep;
});

const { isLoading } = useQuery(['getIncompleteApplications'], () => {
  if (!applicationStore.completeApplication.id) {
    stepIndex.step = 0;
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

// function checkForCorrectForm() {
//   if (
//     applicationStore.completeApplication.application.currentStep > 5 &&
//     applicationStore.completeApplication.application.currentStep <= 9
//   ) {
//     router.push(props.routes.FORM_TWO_ROUTE_PATH);
//   } else if (applicationStore.completeApplication.application.currentStep > 9) {
//     router.push(props.routes.);
//   }
// }
</script>

<style lang="scss" scoped>
.form-card {
  height: auto;
  min-height: 45vh;
}
</style>
