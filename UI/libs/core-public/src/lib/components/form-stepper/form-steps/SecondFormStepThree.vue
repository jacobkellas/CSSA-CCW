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
              state.application = v;
              state.valid = true;
            }
          "
        />
      </div>
      <v-alert
        dense
        outlined
        type="warning"
        v-if="state.application === 'judicial'"
      >
        <strong>
          {{ $t('Judicial-warning') }}
        </strong>
      </v-alert>
      <v-alert
        dense
        outlined
        type="warning"
        v-if="state.application === 'reserve'"
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
    />
  </div>
</template>

<script setup lang="ts">
import ApplicationInfoSection from '@shared-ui/components/info-sections/ApplicationInfoSection';
import RadioGroupInput from '@shared-ui/components/inputs/RadioGroupInput.vue';
import { useApplicationStore } from '@shared-ui/stores/application';
import { reactive } from 'vue';
import FormButtonContainer from '@core-public/components/containers/FormButtonContainer.vue';

interface ISecondFormStepThreeProps {
  handleNextSection: CallableFunction;
}

const props = defineProps<ISecondFormStepThreeProps>();

const applicationStore = useApplicationStore();

const state = reactive({
  application: '',
  valid: false,
});

function handleSubmit() {
  applicationStore.setApplicationType(state.application);
  props.handleNextSection();
}
</script>

<style lang="scss" scoped></style>
