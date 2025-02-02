<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
<template>
  <v-card elevation="0">
    <v-card-title>
      {{ $t('Birth Information') }}
      <v-spacer></v-spacer>
      <SaveButton
        :disabled="!valid"
        @on-save="handleSave"
      />
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid">
        <v-row>
          <v-col>
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="
                    permitStore.getPermitDetail.application.dob.birthDate
                  "
                  :label="$t('Date of birth')"
                  hint="YYYY-MM-DD format"
                  persistent-hint
                  :rules="[validateDate]"
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                >
                  <template #append>
                    <v-icon> mdi-calendar </v-icon>
                    <v-icon
                      color="error"
                      medium
                      v-if="
                        !permitStore.getPermitDetail.application.dob.birthDate
                      "
                    >
                      mdi-alert-octagon
                    </v-icon>
                  </template>
                </v-text-field>
              </template>
              <v-date-picker
                v-model="permitStore.getPermitDetail.application.dob.birthDate"
                color="primary"
                no-title
                @input="menu = false"
                scrollable
              >
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col>
            <v-text-field
              :label="$t('Birth city')"
              :rules="[v => !!v || $t('Birth city cannot be blank')]"
              v-model="permitStore.getPermitDetail.application.dob.birthCity"
              outlined
              dense
            >
              <template #append>
                <v-icon
                  color="error"
                  medium
                  v-if="!permitStore.getPermitDetail.application.dob.birthCity"
                >
                  mdi-alert-octagon
                </v-icon>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-combobox
              :items="countries"
              :label="$t('Birth country')"
              :rules="[v => !!v || $t('Birth country cannot be blank')]"
              v-model="permitStore.getPermitDetail.application.dob.birthCountry"
              autocomplete="nope"
              outlined
              dense
            >
              <template #append>
                <v-icon
                  color="error"
                  medium
                  v-if="
                    !permitStore.getPermitDetail.application.dob.birthCountry
                  "
                >
                  mdi-alert-octagon
                </v-icon>
              </template>
            </v-combobox>
          </v-col>
          <v-col>
            <v-autocomplete
              v-if="
                permitStore.getPermitDetail.application.dob.birthCountry ===
                'United States'
              "
              maxlength="150"
              counter
              :items="states"
              :label="$t('Birth state')"
              :rules="[v => !!v || $t('Birth state cannot be blank')]"
              v-model="permitStore.getPermitDetail.application.dob.birthState"
              autocomplete="nope"
              outlined
              dense
            >
              <template #append>
                <v-icon
                  color="error"
                  medium
                  v-if="!permitStore.getPermitDetail.application.dob.birthState"
                >
                  mdi-alert-octagon
                </v-icon>
              </template>
            </v-autocomplete>

            <v-text-field
              v-if="
                permitStore.getPermitDetail.application.dob.birthCountry !==
                'United States'
              "
              maxlength="150"
              counter
              :label="$t('Birth region')"
              :rules="[v => !!v || $t('Birth region cannot be blank')]"
              v-model="permitStore.getPermitDetail.application.dob.birthState"
              outlined
              dense
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import SaveButton from './SaveButton.vue'
import { ref } from 'vue'
import { usePermitsStore } from '@core-admin/stores/permitsStore'
import { countries, states } from '@shared-utils/lists/defaultConstants'

const emit = defineEmits(['on-save'])
const menu = ref(false)
const valid = ref(false)

const permitStore = usePermitsStore()

function handleSave() {
  emit('on-save', 'Birth Information')
}

function validateDate(inputDate: string | null | undefined): boolean | string {
  const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

  if (!inputDate) {
    return true
  }

  if (!DATE_PATTERN.test(inputDate)) {
    return 'Date must be in the format YYYY-MM-DD'
  }

  return true
}
</script>
