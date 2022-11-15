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
            cols="12"
            lg="6"
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
            cols="12"
            lg="6"
          >
            <v-card>
              <v-card-title>
                {{ $t('Appointment Status') }}
              </v-card-title>
              <v-card-text>
                {{ $t('Scheduled Appointment') }} -
                {{
                  new Date(
                    appointmentsStore.currentAppointment.start
                  ).toLocaleString()
                }}
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
      <v-skeleton-loader
        v-if="state.appointmentsLoading"
        fluid
        class="fill-height"
        type="list-item"
      />

      <AppointmentContainer
        v-else
        :events="state.appointments"
        :toggle-appointment="() => {}"
        :reschedule="true"
      />
    </v-container>
  </div>
</template>

<script setup lang="ts">
import AppointmentContainer from '@core-public/components/containers/AppointmentContainer.vue';
import { AppointmentType } from '@shared-utils/types/defaultTypes';
import { useAppointmentsStore } from '@shared-ui/stores/appointmentsStore';
import { useCompleteApplicationStore } from '@core-public/stores/completeApplication';
import { onMounted, reactive } from 'vue';
import { useMutation, useQuery } from '@tanstack/vue-query';

const applicationStore = useCompleteApplicationStore();
const appointmentsStore = useAppointmentsStore();

const state = reactive({
  status: '',
  showCalendar: false,
  appointments: [],
  appointmentsLoading: true,
});

const { isLoading } = useQuery(['getAppointment'], () => {
  const appointment = appointmentsStore.getSingleAppointment(
    applicationStore.completeApplication.id
  );

  appointment.then(data => {
    appointmentsStore.setCurrentAppointment(data);
  });
});

const allAppointmentsMutation = useMutation({
  mutationFn: () => {
    return appointmentsStore.getAvailableAppointments().then(data => {
      state.appointments = data;
    });
  },
  onSuccess: () => {
    formatAppointments();
    state.appointmentsLoading = false;
  },
  onError: () => {
    window.console.warn('failed');
  },
});

function formatAppointments() {
  let appointments = [] as Array<AppointmentType>;

  state.appointments.forEach((event: AppointmentType) => {
    let newEvent = event;
    let start = new Date(event.start);
    let end = new Date(event.end);

    let formatedStart = `${start.getFullYear()}-${
      start.getMonth() + 1
    }-${start.getDate()} ${start.getHours()}:${start.getMinutes()}`;

    let formatedEnd = `${end.getFullYear()}-${
      end.getMonth() + 1
    }-${end.getDate()} ${end.getHours()}:${end.getMinutes()}`;

    newEvent.start = formatedStart;
    newEvent.end = formatedEnd;
    appointments.push(newEvent);
  });

  state.appointments = appointments;
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

  allAppointmentsMutation.mutate();
});
</script>
