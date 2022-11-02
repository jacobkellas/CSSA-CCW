<template>
  <div>
    <ApplicationInfoSection />
    <v-form>
      <v-subheader class="sub-header font-weight-bold">
        {{ $t('Application Type') }}
      </v-subheader>
      <div class="ml-5">
        <RadioGroupInput
          :layout="'column'"
          :options="[
            { label: 'Standard', value: 'standard' },
            { label: 'Judicial', value: 'judicial', color: 'warning' },
            { label: 'Reserve', value: 'reserve', color: 'warning' },
          ]"
          @input="
            v => {
              completeApplicationStore.completeApplication.applicationType = v;
              state.valid = true;
            }
          "
        />
      </div>
      <v-alert
        dense
        outlined
        type="warning"
        v-if="
          completeApplicationStore.completeApplication.applicationType ===
          'judicial'
        "
      >
        <strong>
          {{ $t('Judicial-warning') }}
        </strong>
      </v-alert>
      <v-alert
        dense
        outlined
        type="warning"
        v-if="
          completeApplicationStore.completeApplication.applicationType ===
          'reserve'
        "
      >
        <strong>
          {{ $t('Judicial-reserve') }}
        </strong>
      </v-alert>
    </v-form>
    <v-divider />
    <FormButtonContainer
      :valid="state.valid"
      @submit="handleSubmit"
      @save="handleSave"
    />
  </div>
</template>

<script setup lang="ts">
import ApplicationInfoSection from '@shared-ui/components/info-sections/ApplicationInfoSection';
import FormButtonContainer from '@core-public/components/containers/FormButtonContainer.vue';
import RadioGroupInput from '@shared-ui/components/inputs/RadioGroupInput.vue';
import { reactive } from 'vue';
import { useCompleteApplicationStore } from '@core-public/stores/completeApplication';
import { useAuthStore } from '@shared-ui/stores/auth';
import { useRouter } from 'vue-router/composables';
import { updateApplication } from '@core-public/senders/applicationSenders';

interface ISecondFormStepThreeProps {
  handleNextSection: CallableFunction;
}

const props = defineProps<ISecondFormStepThreeProps>();
const completeApplicationStore = useCompleteApplicationStore();
const authStore = useAuthStore();
const router = useRouter();

const state = reactive({
  valid: false,
});

async function handleSubmit() {
  await updateApplication(
    completeApplicationStore.completeApplication,
    'Step eight complete',
    authStore.auth.userEmail
  );
  props.handleNextSection();
}

async function handleSave() {
  await updateApplication(
    completeApplicationStore.completeApplication,
    'Save and quit',
    authStore.auth.userEmail
  );
  router.push('/');
}
</script>

<style lang="scss" scoped></style>
