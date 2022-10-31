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
            { label: 'Renew Standard', value: 'renew-standard' },
            {
              label: 'Renew Judicial',
              value: 'renew-judicial',
              color: 'warning',
            },
            {
              label: 'Renew Reserve',
              value: 'renew-reserve',
              color: 'warning',
            },
            { label: 'Modify Standard', value: 'modify-standard' },
            {
              label: 'Modify Judicial',
              value: 'modify-judicial',
              color: 'warning',
            },
            {
              label: 'Modify Reserve',
              value: 'modify-reserve',
              color: 'warning',
            },
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
            'renew-judicial' ||
          completeApplicationStore.completeApplication.applicationType ===
            'modify-judicial'
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
            'renew-reserve' ||
          completeApplicationStore.completeApplication.applicationType ===
            'modify-reserve'
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

interface ISecondFormStepThreeProps {
  handleNextSection: CallableFunction;
}

const props = defineProps<ISecondFormStepThreeProps>();
const completeApplicationStore = useCompleteApplicationStore();

const state = reactive({
  valid: false,
});

function handleSubmit() {
  props.handleNextSection();
}

function handleSave() {
  completeApplicationStore.postCompleteApplicationFromApi;
}
</script>

<style lang="scss" scoped></style>
