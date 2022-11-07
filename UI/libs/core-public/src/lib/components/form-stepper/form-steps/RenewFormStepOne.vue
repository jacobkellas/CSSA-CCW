<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-subheader class="subHeader font-weight-bold">
        {{ $t('personal info') }}
      </v-subheader>

      <v-row class="ml-5">
        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <v-text-field
            id="last-name-field"
            :label="$t('Last name')"
            :rules="[v => !!v || $t('Last name is required')]"
            v-model="completeApplication.personalInfo.lastName"
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

        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <v-text-field
            :label="$t('First name')"
            :rules="[v => !!v || $t('First name is required')]"
            v-model="completeApplication.personalInfo.firstName"
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

        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <v-text-field
            v-if="!completeApplication.personalInfo.noMiddleName"
            :label="$t('Middle name')"
            :rules="[
              v =>
                (!!v && !completeApplication.personalInfo.noMiddleName) ||
                $t('Middle name is required or you must select no middle name'),
            ]"
            v-model="completeApplication.personalInfo.middleName"
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

        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <v-text-field
            :label="$t('Maiden name')"
            v-model="completeApplication.personalInfo.maidenName"
          />
        </v-col>

        <v-col
          cols="6"
          md="5"
        >
          <CheckboxInput
            :target="'noMiddleName'"
            :label="'No middle name'"
            @input="
              v => {
                completeApplication.personalInfo.noMiddleName = v;
              }
            "
          />
        </v-col>
        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <v-text-field
            :label="$t('Suffix')"
            v-model="completeApplication.personalInfo.suffix"
          />
        </v-col>
      </v-row>
      <v-divider class="my-3" />
      <v-subheader class="sub-header font-weight-bold">
        {{ $t(' Permit Information') }}
      </v-subheader>
      <v-row>
        <v-col>
          <v-text-field
            :label="$t(' Permit Number')"
            :rules="[v => !!v || $t(' Permit number cannot be blank')]"
            v-model="completeApplication.license.permitNumber"
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
            :label="$t('Issuing county')"
            :rules="[v => !!v || $t('Issuing county cannot be blank')]"
            v-model="completeApplication.license.issuingCounty"
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
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="completeApplication.license.expirationDate"
                :label="$t('Expiration Date')"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="completeApplication.license.expirationDate"
              no-title
              scrollable
            >
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-divider />
      <v-subheader class="sub-header font-weight-bold">
        {{ $t('Social Security Information') }}
      </v-subheader>

      <v-row class="ml-5">
        <v-col
          cols="7"
          md="5"
          m="3"
        >
          <!-- TODO: Add further validation to this once we decide of SSN formatting -->
          <v-text-field
            :label="$t('Social Security Number')"
            :rules="[v => !!v || $t('Social Security Number cannot be blank')]"
            v-model="completeApplication.personalInfo.ssn"
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

        <v-col
          cols="7"
          md="5"
          sm="3"
        >
          <v-text-field
            :label="$t('Confirm SSN')"
            :rules="[
              v => !!v || 'Confirm ssn cannot be blank',
              v =>
                v === completeApplication.personalInfo.ssn ||
                $t('SSN\'s do not match'),
            ]"
            v-model="ssnConfirm"
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

      <v-divider class="my-3" />

      <v-subheader class="subHeader font-weight-bold">
        {{ $t('marital status') }}
      </v-subheader>
      <v-row class="ml-1">
        <v-col
          cols="10"
          md="5"
          sm="3"
        >
          <RadioGroupInput
            :label="'Marital status'"
            :options="[
              { label: 'Married', value: 'married' },
              { label: 'Single', value: 'single' },
            ]"
            :hint="'Marital Status is required'"
            :layout="'row'"
            @input="
              v => {
                completeApplication.personalInfo.maritalStatus = v;
              }
            "
          />
        </v-col>
        <v-col
          cols="20"
          md="5"
          sm="3"
          v-if="completeApplication.personalInfo.maritalStatus === 'married'"
        >
          <v-subheader class="subHeader font-weight-bold">
            {{ $t('Spouse Information') }}
          </v-subheader>
          <v-row class="ml-5">
            <v-col
              cols="10"
              md="6"
              sm="4"
            >
              <v-text-field
                :label="$t('Last Name')"
                :rules="[v => !!v || $t('Last name cannot be blank')]"
                v-model="completeApplication.spouseInformation.lastName"
              >
                <template #prepend>
                  <v-icon
                    small
                    color="error"
                  >
                    mdi-asterisk
                  </v-icon>
                </template>
              </v-text-field>

              <v-text-field
                :label="$t('Middle Name')"
                v-model="completeApplication.spouseInformation.middleName"
              />
            </v-col>
            <v-col
              cols="10"
              md="6"
              sm="4"
            >
              <v-text-field
                :label="$t('First Name')"
                :rules="[v => !!v || $t('First name cannot be blank')]"
                v-model="completeApplication.spouseInformation.firstName"
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
                :label="$t('Maiden Name')"
                v-model="completeApplication.spouseInformation.maidenName"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>

    <v-divider />
    <v-subheader class="sub-header font-weight-bold">
      {{ $t('aliases') }}
    </v-subheader>
    <div class="alias-components-container">
      <AliasTable :aliases="completeApplication.aliases" />
      <AliasDialog :save-alias="getAliasFromDialog" />
    </div>
    <FormButtonContainer
      :valid="valid"
      @submit="handleSubmit"
      @save="saveMutation.mutate"
      @back="router.push('/application')"
      @cancel="router.push('/')"
    />
    <FormErrorAlert
      v-if="errors.length > 0"
      :errors="errors"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCompleteApplicationStore } from '@core-public/stores/completeApplication';
import { useRouter } from 'vue-router/composables';
import AliasDialog from '@core-public/components/dialogs/AliasDialog.vue';
import AliasTable from '@shared-ui/components/tables/AliasTable.vue';
import CheckboxInput from '@shared-ui/components/inputs/CheckboxInput.vue';
import RadioGroupInput from '@shared-ui/components/inputs/RadioGroupInput.vue';
import FormErrorAlert from '@shared-ui/components/alerts/FormErrorAlert.vue';
import FormButtonContainer from '@core-public/components/containers/FormButtonContainer.vue';
import { useMutation } from '@tanstack/vue-query';
import Routes from '@core-public/router/routes';
import { i18n } from '@core-public/plugins';

interface FormStepOneProps {
  handleNextSection: () => void;
}

const props = withDefaults(defineProps<FormStepOneProps>(), {
  handleNextSection: () => null,
});

const errors = ref([] as Array<string>);
const valid = ref(false);
const menu = ref(false);
let ssnConfirm = ref('');

const completeApplicationStore = useCompleteApplicationStore();
const completeApplication =
  completeApplicationStore.completeApplication.application;

const router = useRouter();

const updateMutation = useMutation({
  mutationFn: () => {
    return completeApplicationStore.updateApplication('Renewal Step one');
  },
  onSuccess: () => {
    props.handleNextSection();
  },
  onError: () => {
    alert(i18n.t('Save unsuccessful, please try again'));
  },
});

const saveMutation = useMutation({
  mutationFn: () => {
    return completeApplicationStore.updateApplication('Save and quit');
  },
  onSuccess: () => {
    router.push(Routes.HOME_ROUTE_PATH);
  },
  onError: () => {
    alert(i18n.t('Save unsuccessful, please try again'));
  },
});

function handleSubmit() {
  if (!completeApplication.personalInfo.maritalStatus) {
    errors.value.push('Marital Status');
  } else {
    updateMutation.mutate();
  }
}

function getAliasFromDialog(alias) {
  completeApplicationStore.completeApplication.aliases.unshift(alias);
}
</script>

<style lang="scss" scoped></style>
