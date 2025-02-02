<template>
  <v-container class="info-section-container rounded">
    <v-banner
      single-line
      class="sub-header font-weight-bold text-xl text-left my-5"
    >
      {{ $t('Personal Information: ') }}
      <template #actions>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              v-if="
                completeApplicationStore.completeApplication.application
                  .status == 1
              "
              icon
              @click="handleEditRequest"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon :color="$vuetify.theme.dark ? 'info' : 'info'">
                mdi-square-edit-outline
              </v-icon>
            </v-btn>
          </template>
          {{ $t('Edit Section') }}
        </v-tooltip>
      </template>
    </v-banner>
    <v-row>
      <v-col
        cols="12"
        lg="6"
      >
        <v-banner
          rounded
          single-line
          class="text-left"
        >
          <v-icon
            left
            color="primary"
          >
            mdi-account
          </v-icon>
          <strong>
            {{ $t('Last Name: ') }}
          </strong>
          {{ props.personalInfo.lastName }}
        </v-banner>
      </v-col>

      <v-col
        cols="12"
        lg="6"
      >
        <v-banner
          rounded
          class="text-left"
          single-line
        >
          <v-icon
            left
            color="primary"
          >
            mdi-account
          </v-icon>
          <strong>
            {{ $t('First Name: ') }}
          </strong>
          {{ props.personalInfo.firstName }}
        </v-banner>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        lg="6"
      >
        <v-banner
          single-line
          class="text-left"
        >
          <v-icon
            color="primary"
            left
          >
            mdi-account
          </v-icon>
          <strong>
            {{ $t('Middle Name: ') }}
          </strong>
          {{ props.personalInfo.middleName }}
        </v-banner>
      </v-col>

      <v-col
        cols="12"
        lg="6"
      >
        <v-banner
          single-line
          class="text-left"
        >
          <v-icon
            left
            color="primary"
          >
            mdi-account
          </v-icon>
          <strong>
            {{ $t('Maiden Name: ') }}
          </strong>
          {{ props.personalInfo.maidenName }}
        </v-banner>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        lg="6"
      >
        <v-banner
          class="text-left"
          single-line
        >
          <v-icon
            left
            color="primary"
          >
            mdi-account
          </v-icon>
          <strong>
            {{ $t('Suffix: ') }}
          </strong>
          {{ props.personalInfo.suffix }}
        </v-banner>
      </v-col>
      <v-col
        cols="12"
        lg="6"
      >
        <v-banner
          single-line
          class="text-left"
        >
          <v-icon
            left
            color="primary"
          >
            mdi-account
          </v-icon>
          <strong>
            {{ $t('SSN: ') }}
          </strong>
          {{ props.personalInfo.ssn }}
        </v-banner>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        lg="6"
      >
        <v-banner
          single-line
          class="text-left"
        >
          <v-icon
            left
            color="primary"
          >
            mdi-account
          </v-icon>
          <strong>
            {{ $t('Marital Status: ') }}
          </strong>
          {{ props.personalInfo.maritalStatus }}
        </v-banner>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { PersonalInfoType } from '@shared-utils/types/defaultTypes'
import { useCompleteApplicationStore } from '@shared-ui/stores/completeApplication'
import { useRouter } from 'vue-router/composables'

interface personalInfoSectionProps {
  personalInfo: PersonalInfoType
  color: string
}

const router = useRouter()
const props = defineProps<personalInfoSectionProps>()
const completeApplicationStore = useCompleteApplicationStore()

function handleEditRequest() {
  completeApplicationStore.completeApplication.application.currentStep = 1
  router.push({
    path: '/form',
    query: {
      applicationId: completeApplicationStore.completeApplication.id,
      isComplete:
        completeApplicationStore.completeApplication.application.isComplete.toString(),
    },
  })
}
</script>

<style lang="scss" scoped>
.info-section-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.info-row {
  display: flex;
  flex-direction: row;
  max-height: 2vh;
  min-height: 1vh;
}

.info-text {
  margin-left: 0.5rem;
  text-align: start;
  height: 1.8em;
  width: 50%;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  padding-bottom: 0.5rem;
  background-color: rgba(211, 241, 241, 0.3);
  border-bottom: 1px solid #666;
  border-radius: 5px;
  font-size: 1.2em;
  font-weight: bold;
}
</style>
