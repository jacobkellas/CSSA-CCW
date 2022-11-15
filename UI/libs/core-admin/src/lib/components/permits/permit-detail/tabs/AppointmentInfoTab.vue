<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
<template>
  <v-card elevation="3">
    <v-card-title class="text-h5">
      {{ $t('Appointment Date and Time:') }}
    </v-card-title>
    <v-row class="ml-5 mr-5">
      <v-col
        cols="12"
        justify="space-between"
      >
        <v-card class="appointment-card text-left">
          <v-card-text class="font-weight-bold">
            Appointment is: September 26, 2022, 8:00:00 AM PDT
            <v-btn
              small
              class="ml-8"
            >
              {{ $t('Completed') }}
            </v-btn>
            <v-btn
              small
              class="ml-8"
            >
              {{ $t('No Show') }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
<style lang="scss" scoped>
.appointment-card.v-card.theme--light {
  color: green;
  background-color: #a5d6a7 !important;
  border-color: #a5d6a7 !important;
}
</style>
