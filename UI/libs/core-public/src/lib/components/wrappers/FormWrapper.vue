<template>
  <div>
    <v-container v-if="isGetApplicationsLoading && !state.isError">
      <v-skeleton-loader
        fluid
        class="fill-height"
        type="list-item,
        divider, list-item-three-line,
        card-heading, image, image, image,
        image, actions"
      >
      </v-skeleton-loader>
    </v-container>
    <v-container
      v-else-if="!$vuetify.breakpoint.xsOnly"
      fluid
    >
      <v-stepper
        v-model="stepIndex.step"
        non-linear
        class="stepper"
        @change="updateMutation"
      >
        <v-stepper-header
          :class="$vuetify.theme.dark ? 'sticky-dark' : 'sticky-light'"
        >
          <v-stepper-step
            editable
            :complete="stepOneValid"
            :edit-icon="stepOneValid ? 'mdi-check' : '$edit'"
            :color="stepOneValid ? 'success' : 'primary'"
            :step="1"
          >
            {{ $t('Personal') }}
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            editable
            :complete="stepTwoValid"
            :edit-icon="stepTwoValid ? 'mdi-check' : '$edit'"
            :color="stepTwoValid ? 'success' : 'primary'"
            :step="2"
          >
            {{ $t('ID Information') }}
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            editable
            :complete="stepThreeValid"
            :edit-icon="stepThreeValid ? 'mdi-check' : '$edit'"
            :color="stepThreeValid ? 'success' : 'primary'"
            :step="3"
          >
            {{ $t('Address') }}
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            editable
            :complete="stepFourValid"
            :edit-icon="stepFourValid ? 'mdi-check' : '$edit'"
            :color="stepFourValid ? 'success' : 'primary'"
            :step="4"
          >
            {{ $t(' Employment & Weapons') }}
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            editable
            :complete="stepFiveValid"
            :edit-icon="stepFiveValid ? 'mdi-check' : '$edit'"
            :color="stepFiveValid ? 'success' : 'primary'"
            :step="5"
          >
            {{ $t('Application Type') }}
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            editable
            :complete="stepSixValid"
            :edit-icon="stepSixValid ? 'mdi-check' : '$edit'"
            :color="stepSixValid ? 'success' : 'primary'"
            :step="6"
          >
            {{ $t(' Upload Files') }}
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            editable
            :complete="stepSevenValid"
            :edit-icon="stepSevenValid ? 'mdi-check' : '$edit'"
            :color="stepSevenValid ? 'success' : 'primary'"
            :step="7"
          >
            {{ $t('Qualifying Questions') }}
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            editable
            :complete="stepEightValid"
            :edit-icon="stepEightValid ? 'mdi-check' : '$edit'"
            :color="stepEightValid ? 'success' : 'primary'"
            :step="8"
          >
            {{ $t('Signature') }}
          </v-stepper-step>
          <v-progress-linear
            :active="isLoading || isSaveLoading"
            indeterminate
          ></v-progress-linear>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content :step="1">
            <PersonalInfoStep
              v-model="applicationStore.completeApplication"
              @update-step-one-valid="handleUpdateStepOneValid"
              @handle-save="handleSave"
              @handle-submit="handleSubmit"
            />
          </v-stepper-content>
          <v-stepper-content :step="2">
            <IdBirthInfoStep
              v-model="applicationStore.completeApplication"
              @update-step-two-valid="handleUpdateStepTwoValid"
              @handle-save="handleSave"
              @handle-submit="handleSubmit"
            />
          </v-stepper-content>
          <v-stepper-content :step="3">
            <AddressInfoStep
              v-model="applicationStore.completeApplication"
              @update-step-three-valid="handleUpdateStepThreeValid"
              @handle-save="handleSave"
              @handle-submit="handleSubmit"
            />
          </v-stepper-content>
          <v-stepper-content :step="4">
            <WorkInfoStep
              v-model="applicationStore.completeApplication"
              @update-step-four-valid="handleUpdateStepFourValid"
              @handle-save="handleSave"
              @handle-submit="handleSubmit"
            />
          </v-stepper-content>
          <v-stepper-content :step="5">
            <ApplicationTypeStep
              v-model="applicationStore.completeApplication"
              @update-step-five-valid="handleUpdateStepFiveValid"
              @handle-save="handleSave"
              @handle-submit="handleSubmit"
            />
          </v-stepper-content>
          <v-stepper-content :step="6">
            <FileUploadStep
              v-model="applicationStore.completeApplication"
              @update-step-six-valid="handleUpdateStepSixValid"
              @handle-save="handleSave"
              @handle-submit="handleSubmit"
            />
          </v-stepper-content>
          <v-stepper-content :step="7">
            <QualifyingQuestionsStep
              v-model="applicationStore.completeApplication"
              @update-step-seven-valid="handleUpdateStepSevenValid"
              @handle-save="handleSave"
              @handle-submit="handleSubmit"
            />
          </v-stepper-content>
          <v-stepper-content :step="8">
            <SignatureStep
              v-model="applicationStore.completeApplication"
              :routes="routes"
              :all-steps-complete="allStepsComplete"
              @update-step-eight-valid="handleUpdateStepEightValid"
              @handle-save="handleSave"
            />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>

    <v-container
      v-else
      class="pa-0"
    >
      <v-progress-circular
        v-if="isLoading || isSaveLoading"
        indeterminate
        absolute
        class="progress-circular"
      ></v-progress-circular>
      <v-expansion-panels
        v-model="expansionStep"
        accordion
        @change="updateMutation"
      >
        <v-expansion-panel>
          <v-expansion-panel-header @click.native="stepIndex.step = 1">
            {{ $t('Personal') }}
          </v-expansion-panel-header>
          <v-expansion-panel-content eager>
            <PersonalInfoStep
              v-model="applicationStore.completeApplication"
              @update-step-one-valid="handleUpdateStepOneValid"
              @handle-save="handleSave"
              @handle-submit="handleSubmit"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header @click.native="stepIndex.step = 2">
            {{ $t('ID Information') }}
          </v-expansion-panel-header>
          <v-expansion-panel-content eager>
            <IdBirthInfoStep
              v-model="applicationStore.completeApplication"
              @update-step-two-valid="handleUpdateStepTwoValid"
              @handle-save="handleSave"
              @handle-submit="handleSubmit"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header @click.native="stepIndex.step = 3">
            {{ $t('Address') }}
          </v-expansion-panel-header>
          <v-expansion-panel-content eager>
            <AddressInfoStep
              v-model="applicationStore.completeApplication"
              @update-step-three-valid="handleUpdateStepThreeValid"
              @handle-save="handleSave"
              @handle-submit="handleSubmit"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header @click.native="stepIndex.step = 4">
            {{ $t(' Employment & Weapons') }}
          </v-expansion-panel-header>
          <v-expansion-panel-content eager>
            <WorkInfoStep
              v-model="applicationStore.completeApplication"
              @update-step-four-valid="handleUpdateStepFourValid"
              @handle-save="handleSave"
              @handle-submit="handleSubmit"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header @click.native="stepIndex.step = 5">
            {{ $t('Application Type') }}
          </v-expansion-panel-header>
          <v-expansion-panel-content eager>
            <ApplicationTypeStep
              v-model="applicationStore.completeApplication"
              @update-step-five-valid="handleUpdateStepFiveValid"
              @handle-save="handleSave"
              @handle-submit="handleSubmit"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header @click.native="stepIndex.step = 6">
            {{ $t(' Upload Files') }}
          </v-expansion-panel-header>
          <v-expansion-panel-content eager>
            <FileUploadStep
              v-model="applicationStore.completeApplication"
              @update-step-six-valid="handleUpdateStepSixValid"
              @handle-save="handleSave"
              @handle-submit="handleSubmit"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header @click.native="stepIndex.step = 7">
            {{ $t('Qualifying Questions') }}
          </v-expansion-panel-header>
          <v-expansion-panel-content eager>
            <QualifyingQuestionsStep
              v-model="applicationStore.completeApplication"
              @update-step-seven-valid="handleUpdateStepSevenValid"
              @handle-save="handleSave"
              @handle-submit="handleSubmit"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header @click.native="stepIndex.step = 8">
            {{ $t('Signature') }}
          </v-expansion-panel-header>
          <v-expansion-panel-content eager>
            <SignatureStep
              v-model="applicationStore.completeApplication"
              :routes="routes"
              :all-steps-complete="allStepsComplete"
              @update-step-eight-valid="handleUpdateStepEightValid"
              @handle-save="handleSave"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import AddressInfoStep from '@core-public/components/form-stepper/form-steps/AddressInfoStep.vue'
import ApplicationTypeStep from '@core-public/components/form-stepper/form-steps/ApplicationTypeStep.vue'
import { CompleteApplication } from '@shared-utils/types/defaultTypes'
import FileUploadStep from '@core-public/components/form-stepper/form-steps/FileUploadStep.vue'
import IdBirthInfoStep from '@core-public/components/form-stepper/form-steps/IdBirthInfoStep.vue'
import PersonalInfoStep from '@core-public/components/form-stepper/form-steps/PersonalInfoStep.vue'
import QualifyingQuestionsStep from '@core-public/components/form-stepper/form-steps/QualifyingQuestionsStep.vue'
import SignatureStep from '@core-public/components/form-stepper/form-steps/SignatureStep.vue'
import WorkInfoStep from '@core-public/components/form-stepper/form-steps/WorkInfoStep.vue'
import { useCompleteApplicationStore } from '@shared-ui/stores/completeApplication'
import { useRouter } from 'vue-router/composables'
import { computed, onMounted, reactive, ref } from 'vue'
import { useMutation, useQuery } from '@tanstack/vue-query'

interface IWrapperProps {
  admin: boolean
  routes: unknown
}

const props = defineProps<IWrapperProps>()

const applicationStore = useCompleteApplicationStore()
const router = useRouter()
const stepOneValid = ref(false)
const stepTwoValid = ref(false)
const stepThreeValid = ref(false)
const stepFourValid = ref(false)
const stepFiveValid = ref(false)
const stepSixValid = ref(false)
const stepSevenValid = ref(false)
const stepEightValid = ref(false)

const stepIndex = reactive({
  step: 0,
  previousStep: 0,
})

const state = reactive({
  isLoading: false,
  isError: false,
  isApplicationValid: false,
})

const expansionStep = computed(() => stepIndex.step - 1)

const { isLoading, mutate: updateMutation } = useMutation({
  mutationFn: () => {
    return applicationStore.updateApplication()
  },
})

const { isLoading: isSaveLoading, mutate: saveMutation } = useMutation({
  mutationFn: () => {
    return applicationStore.updateApplication()
  },
  onSuccess: () => {
    router.push('/')
  },
})

onMounted(() => {
  state.isApplicationValid = Boolean(applicationStore.completeApplication.id)

  stepIndex.step = applicationStore.completeApplication.application.currentStep

  if (stepIndex.step === 10) {
    stepIndex.step = 8
  }
})

const { isLoading: isGetApplicationsLoading } = useQuery(
  ['getApplicationsByUser'],
  () => applicationStore.getAllUserApplicationsApi(),
  {
    enabled: !state.isApplicationValid,
    onSuccess: data => {
      applicationStore.setCompleteApplication(data[0] as CompleteApplication)
    },
  }
)

function handleSave() {
  saveMutation()
}

function handleSubmit() {
  if (applicationStore.completeApplication.application.currentStep < 8) {
    applicationStore.completeApplication.application.currentStep =
      stepIndex.step + 1
  }

  updateMutation()
  window.scrollTo(0, 0)
  stepIndex.previousStep = stepIndex.step
  stepIndex.step += 1
}

function handleUpdateStepOneValid(value: boolean) {
  stepOneValid.value = value
}

function handleUpdateStepTwoValid(value: boolean) {
  stepTwoValid.value = value
}

function handleUpdateStepThreeValid(value: boolean) {
  stepThreeValid.value = value
}

function handleUpdateStepFourValid(value: boolean) {
  stepFourValid.value = value
}

function handleUpdateStepFiveValid(value: boolean) {
  stepFiveValid.value = value
}

function handleUpdateStepSixValid(value: boolean) {
  stepSixValid.value = value
}

function handleUpdateStepSevenValid(value: boolean) {
  stepSevenValid.value = value
}

function handleUpdateStepEightValid(value: boolean) {
  stepEightValid.value = value
}

const allStepsComplete = computed(() => {
  return (
    stepOneValid.value &&
    stepTwoValid.value &&
    stepThreeValid.value &&
    stepFourValid.value &&
    stepFiveValid.value &&
    stepSixValid.value &&
    stepSevenValid.value &&
    stepEightValid.value
  )
})
</script>

<style lang="scss">
@media only screen and (max-width: 1900px) {
  .v-stepper:not(.v-stepper--vertical) .v-stepper__label {
    display: none !important;
  }
}

.theme--dark.v-expansion-panels .v-expansion-panel {
  background: #303030;
}

.v-expansion-panel-content__wrap {
  padding-left: 5px !important;
  padding-right: 5px !important;
}

.stepper {
  overflow: visible;
}

.sticky-light {
  position: sticky;
  top: 64px;
  z-index: 1;
  background-color: white;
}

.sticky-dark {
  position: sticky;
  top: 64px;
  z-index: 1;
  background-color: #303030;
}

.progress-circular {
  position: fixed;
  top: 75px;
  left: 50%;
  z-index: 2;
}

.theme--dark.v-label.v-label--active {
  color: white !important;
}
</style>
