<template>
  <div>
    <v-form
      ref="form"
      v-model="state.valid"
    >
      <v-subheader class="sub-header, font-weight-bold">
        {{ $t(' Employment Status') }}
      </v-subheader>

      <v-row class="ml-5">
        <v-col cols="6">
          <v-select
            id="select"
            :items="employmentStatus"
            :label="$t(' Employment Status')"
            :rules="[v => !!v || $t(' Employment status is required')]"
            @change="
              v => {
                completeApplicationStore.completeApplication.employment =
                  v.toLowerCase();
              }
            "
          >
          </v-select>
        </v-col>
      </v-row>
      <v-divider />
      <div
        v-if="
          completeApplicationStore.completeApplication.employment === 'employed'
        "
      >
        <v-subheader class="sub-header font-weight-bold">
          {{ $t('Work Information') }}
        </v-subheader>
        <v-row>
          <v-col>
            <v-text-field
              :label="$t('Employer Name')"
              :rules="[v => !!v || $t('You must enter a employer name')]"
              v-model="
                completeApplicationStore.completeApplication.workInformation
                  .employerName
              "
            >
              <template #prepend>
                <v-icon
                  x-small
                  color="error"
                >
                  mdi-asterisk
                </v-icon>
              </template>
            </v-text-field>

            <v-text-field
              :label="$t('Employer Address Line 1')"
              :rules="[v => !!v || $t('You must enter a address')]"
              v-model="
                completeApplicationStore.completeApplication.workInformation
                  .employerAddressLine1
              "
            >
              <template #prepend>
                <v-icon
                  x-small
                  color="error"
                >
                  mdi-asterisk
                </v-icon>
              </template>
            </v-text-field>
            <v-text-field
              :label="$t('Employer Address Line 2')"
              v-model="
                completeApplicationStore.completeApplication.workInformation
                  .employerAddressLine2
              "
            >
            </v-text-field>
            <v-text-field
              :label="$t('Employer City')"
              :rules="[v => !!v || $t('You must enter a city')]"
              v-model="
                completeApplicationStore.completeApplication.workInformation
                  .employerCity
              "
            >
              <template #prepend>
                <v-icon
                  x-small
                  color="error"
                >
                  mdi-asterisk
                </v-icon>
              </template>
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              :label="$t('Employer State')"
              :rules="[v => !!v || $t('You must enter a state')]"
              v-model="
                completeApplicationStore.completeApplication.workInformation
                  .employerCity
              "
            >
              <template #prepend>
                <v-icon
                  x-small
                  color="error"
                >
                  mdi-asterisk
                </v-icon>
              </template>
            </v-text-field>
            <v-text-field
              :label="$t('Employer Zip Code')"
              :rules="[v => !!v || $t('You must enter a Zip Code')]"
              v-model="
                completeApplicationStore.completeApplication.workInformation
                  .employerZip
              "
            >
              <template #prepend>
                <v-icon
                  x-small
                  color="error"
                >
                  mdi-asterisk
                </v-icon>
              </template>
            </v-text-field>
            <v-text-field
              :label="$t('Employer Phone number')"
              :rules="[v => !!v || $t('You must enter a phone number')]"
              v-model="
                completeApplicationStore.completeApplication.workInformation
                  .employerPhone
              "
            >
              <template #prepend>
                <v-icon
                  x-small
                  color="error"
                >
                  mdi-asterisk
                </v-icon>
              </template>
            </v-text-field>
            <v-text-field
              :label="$t('Employer Country')"
              :rules="[v => !!v || $t('You must enter a country')]"
              v-model="
                completeApplicationStore.completeApplication.workInformation
                  .employerCountry
              "
            >
              <template #prepend>
                <v-icon
                  x-small
                  color="error"
                >
                  mdi-asterisk
                </v-icon>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </div>
    </v-form>
    <div class="weapon-components-container">
      <WeaponsTable
        :weapons="completeApplicationStore.completeApplication.weapons"
      />
      <WeaponsDialog :save-weapon="getWeaponFromDialog" />
    </div>
    <v-divider />
    <FormButtonContainer
      :valid="state.valid"
      @submit="handleSubmit"
      @save="handleSave"
    />
  </div>
</template>

<script setup lang="ts">
import FormButtonContainer from '@core-public/components/containers/FormButtonContainer.vue';
import { employmentStatus } from '@shared-utils/lists/defaultConstants';
import { reactive } from 'vue';
import { updateApplication } from '@core-public/senders/applicationSenders';
import { useAuthStore } from '@shared-ui/stores/auth';
import { useCompleteApplicationStore } from '@core-public/stores/completeApplication';
import { useRouter } from 'vue-router/composables';
import WeaponsDialog from '@core-public/components/dialogs/WeaponsDialog.vue';
import WeaponsTable from '@shared-ui/components/tables/WeaponsTable.vue';

interface ISecondFormStepOneProps {
  handleNextSection: CallableFunction;
}
const completeApplicationStore = useCompleteApplicationStore();

const props = defineProps<ISecondFormStepOneProps>();
const authStore = useAuthStore();
const router = useRouter();

const state = reactive({
  valid: false,
});

async function handleSubmit() {
  await updateApplication(
    completeApplicationStore.completeApplication,
    'Step six complete',
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

function getWeaponFromDialog(weapon) {
  completeApplicationStore.completeApplication.weapons.push(weapon);
}
</script>

<style lang="scss" scoped>
.weapon-components-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
