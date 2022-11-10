<template>
  <div>
    <v-container v-if="isLoading">
      <v-skeleton-loader
        fluid
        class="fill-height"
        type="list-item"
      />
    </v-container>
    <v-container v-else>
      <v-sheet class="p-5 rounded">
        <v-row>
          <v-col
            cols="6"
            lg="5"
            sm="1"
          >
            <v-card class="text-left">
              <v-card-title class="ml-5">
                {{ $t('Application Status') }}
              </v-card-title>
              <v-card-text class="ml-5">
                {{ $t('Status: ') }}
                {{ state.status }}
              </v-card-text>
              <v-card-text class="ml-5">
                {{ $t('Order Number: ') }}
                {{ applicationStore.completeApplication.application.orderId }}
              </v-card-text>
              <v-card-text class="ml-5">
                {{ $t('Application Type: ') }}
                {{
                  applicationStore.completeApplication.application
                    .applicationType
                }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            cols="6"
            lg="5"
            sm="1"
          >
            <v-card>
              <v-card-title>
                {{ $t('Appointment Status') }}
              </v-card-title>
              <v-card-text>
                {{ state.appointment.date }} - {{ state.appointment.time }}
              </v-card-text>
              <v-card-title>
                <v-btn
                  color="success"
                  @click="state.showCalendar = !state.showCalendar"
                >
                  {{ $t('Reschedule') }}
                </v-btn>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>
    <v-container v-if="state.showCalendar">
      {{ getAllAppointments() }}
      <AppointmentContainer
        :events="state.appointments"
        :toggle-appointment="() => {}"
        :reschedule="true"
      />
    </v-container>
  </div>
</template>

<script setup lang="ts">
import AppointmentContainer from '@core-public/components/containers/AppointmentContainer.vue';
import axios from 'axios';
import Endpoints from '@shared-ui/api/endpoints';
import { AppointmentType } from '@shared-utils/types/defaultTypes';
import { getAppointments } from '@core-public/senders/appointmentSenders';
import { useCompleteApplicationStore } from '@core-public/stores/completeApplication';
import { useQuery } from '@tanstack/vue-query';
import { onMounted, reactive } from 'vue';

const applicationStore = useCompleteApplicationStore();

const state = reactive({
  appointment: {} as AppointmentType,
  status: '',
  showCalendar: false,
  appointments: [],
});

const { isLoading } = useQuery(['getAppointment'], () => {
  const res = axios.get(Endpoints.GET_SINGLE_APPOINTMENT, {
    params: {
      applicationId: applicationStore.completeApplication.id,
    },
  });

  res.then(data => {
    state.appointment = data;
  });
});

function getAllAppointments() {
  const res = getAppointments();

  res.then(data => {
    data.forEach(event => {
      let start = new Date(event.start);
      let end = new Date(event.end);

      let formatedStart = `${start.getFullYear()}-${
        start.getMonth() + 1
      }-${start.getDate()} ${start.getHours()}:${start.getMinutes()}`;

      let formatedEnd = `${end.getFullYear()}-${
        end.getMonth() + 1
      }-${end.getDate()} ${end.getHours()}:${end.getMinutes()}`;

      event.start = formatedStart;
      event.end = formatedEnd;
    });
    state.appointments = data;
  });
}

onMounted(() => {
  switch (applicationStore.completeApplication.application.status) {
    case 0:
      state.status = 'None';
      break;
    case 1:
      state.status = 'Started';
      break;
    case 2:
      state.status = 'Submitted';
      break;
    case 3:
      state.status = 'In progress';
      break;
    case 4:
      state.status = 'Cancelled';
      break;
    case 5:
      state.status = 'Returned';
      break;
    case 6:
      state.status = 'Complete';
      break;
    default:
      break;
  }
});
</script>
