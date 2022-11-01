<template>
  <div class="finalize-view">
    <SideBar
      :options="options"
      :title="'Information Sections'"
      :handle-selection="handleSelection"
    />
    <FinalizeContainer />
    <PaymentContainer :toggle-payment="togglePaymentComplete" />
    <AppointmentContainer :toggle-appointment="toggleAppointmentComplete" />
    <v-container class="finalize-submit">
      <v-btn
        :disabled="!state.appointmentComplete || !state.paymentComplete"
        color="primary"
      >
        {{ $t('Submit Application') }}
      </v-btn>
      <v-btn color="error">
        {{ $t('Cancel') }}
      </v-btn>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import AppointmentContainer from '@core-public/components/containers/AppointmentContainer.vue';
import FinalizeContainer from '@core-public/components/containers/FinalizeContainer.vue';
import PaymentContainer from '@core-public/components/containers/PaymentContainer.vue';
import SideBar from '@core-public/components/navbar/SideBar.vue';
import { useCurrentInfoSection } from '@core-public/stores/currentInfoSection';
import { reactive } from 'vue';
//TODO: make the api call here to get the appointments and pass as a prop to the appointmentContainer.
const currentInfoSectionStore = useCurrentInfoSection();

const options = [
  'Personal Information',
  'Spouse Information',
  'Alias Information',
  'Id/Birth Information',
  'Citizenship Information',
  'Current Address Information',
  'Previous Address Information',
  'Mailing Address Information',
  'Physical Appearance',
  'Contact Information',
  'Employment Information',
  'Weapons Information',
];
const state = reactive({
  paymentComplete: false,
  appointmentComplete: false,
});

function handleSelection(target: number) {
  currentInfoSectionStore.setCurrentInfoSection(target);
}

function togglePaymentComplete() {
  state.paymentComplete = !state.paymentComplete;
}

function toggleAppointmentComplete() {
  state.appointmentComplete = !state.appointmentComplete;
}
</script>

<style lang="scss" scoped>
.finalize {
  &-view {
    height: 100%;
    width: 80%;
  }
  &-submit {
    display: flex;
    justify-content: space-around;
    height: 10%;
    width: 80%;
  }
}
</style>
