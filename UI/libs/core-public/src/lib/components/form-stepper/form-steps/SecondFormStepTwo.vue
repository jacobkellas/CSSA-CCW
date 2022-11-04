<template>
  <div>
    <DocumentInfoSection />
    <v-form
      ref="form"
      v-model="state.valid"
    >
      <v-subheader class="sub-header font-weight-bold">
        {{ $t('File Upload') }}
      </v-subheader>
      <v-row>
        <v-col
          cols="4"
          lg="4"
          sm="1"
        >
          <v-file-input
            ref="driver-license"
            show-size
            small-chips
            accept="image/png, image/jpeg"
            :label="$t('Driver License')"
            @change="handleFileInput($event, 'DriverLicense')"
          />
        </v-col>
        <v-col
          cols="4"
          lg="4"
          sm="1"
        >
          <v-file-input
            show-size
            small-chips
            accept=".pdf, .doc, .docx"
            :label="$t('Proof of Residence 1')"
            @change="handleFileInput($event, 'ProofResidency')"
          />
        </v-col>
        <v-col
          cols="4"
          lg="4"
          sm="1"
        >
          <v-file-input
            show-size
            small-chips
            accept=".pdf, .doc, .docx"
            :label="$t('Proof of Residence 2')"
            @change="handleFileInput($event, 'ProofResidency2')"
          />
        </v-col>
      </v-row>
      <v-divider />
      <v-subheader class="sub-header font-weight-bold">
        {{ $t(' Military') }}
      </v-subheader>
      <v-row>
        <v-col
          cols="4"
          lg="4"
          sm="1"
        >
          <v-file-input
            show-size
            small-chips
            accept=".pdf, .doc, .docx"
            :label="$t('Military Document')"
            @change="handleFileInput($event, 'MilitaryDoc')"
          />
        </v-col>
      </v-row>
      <v-divider />
      <v-subheader class="sub-header font-weight-bold">
        {{ $t(' Not born in US') }}
      </v-subheader>
      <v-row>
        <v-col
          cols="4"
          lg="4"
          sm="1"
        >
          <v-file-input
            show-size
            small-chips
            accept=".pdf, .doc, .dox"
            :label="$t('Citizenship Documents')"
            @change="handleFileInput($event, 'Citizenship')"
          />
        </v-col>
      </v-row>

      <v-divider />
      <v-subheader class="sub-header font-weight-bold">
        {{ $t(' Supporting Documents') }}
      </v-subheader>
      <v-row>
        <v-col
          cols="4"
          lg="4"
          sm="1"
        >
          <v-file-input
            show-size
            small-chips
            multiple
            :label="$t('Supporting Documents')"
            @change="handleFileInput($event, 'Supporting')"
          />
        </v-col>
      </v-row>
      <v-divider />

      <v-subheader class="sub-header font-weight-bold">
        {{ $t(' Legal name change') }}
      </v-subheader>
      <v-row>
        <v-col
          cols="4"
          lg="4"
          sm="1"
        >
          <v-file-input
            show-size
            small-chips
            accept=".pdf, .doc, .dox"
            :label="$t('Name change documents')"
            @change="handleFileInput($event, 'NameChange')"
          />
        </v-col>
      </v-row>
      <v-divider />
      <v-subheader class="sub-header font-weight-bold">
        {{ $t(' License Type Documents') }}
      </v-subheader>
      <v-row>
        <v-col
          cols="4"
          lg="4"
          sm="1"
        >
          <v-file-input
            show-size
            small-chips
            accept=".pdf, .doc, .dox"
            :label="$t('Judicial documents')"
            @change="handleFileInput($event, 'Judicial')"
          />
        </v-col>
        <v-col
          cols="4"
          lg="4"
          sm="1"
        >
          <v-file-input
            show-size
            small-chips
            accept=".pdf, .doc, .dox"
            :label="$t('Reserve documents')"
            @change="handleFileInput($event, 'Reserve')"
          />
        </v-col>
      </v-row>
      <v-divider />
    </v-form>
    <v-progress-circular
      v-if="!state.uploadSuccessful"
      color="primary"
      indeterminate
    />
    <FormButtonContainer
      v-else
      :valid="state.valid"
      @submit="handleSubmit"
    />
    <v-snackbar
      v-model="state.snackbar"
      :timeout="2000"
    >
      {{ $t('error message') }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import DocumentInfoSection from '@shared-ui/components/info-sections/DocumentInfoSection.vue';
import FormButtonContainer from '@core-public/components/containers/FormButtonContainer.vue';
import { reactive } from 'vue';
import { useCompleteApplicationStore } from '@core-public/stores/completeApplication';
import { useMutation } from '@tanstack/vue-query';
import axios from 'axios';

const applicationStore = useCompleteApplicationStore();
const completeApplication = applicationStore.completeApplication.application;

interface ISecondFormStepTwoProps {
  handleNextSection: CallableFunction;
}

const props = defineProps<ISecondFormStepTwoProps>();

const state = reactive({
  driver: {} as File,
  files: [] as Array<File>,
  valid: false,
  uploadSuccessful: true,
  snackbar: false,
});

const fileMutation = useMutation({
  mutationFn: handleFileUpload,
  onSuccess: () => {
    state.uploadSuccessful = true;
  },
  onError: () => {
    state.snackbar = true;
  },
});

function handleFileInput(event: File, target: string) {
  // need to add the application id to this.
  let filetype = '';

  switch (event.type) {
    case 'application/pdf':
      filetype = '.pdf';
      break;
    case 'image/jpeg':
      filetype = '.jpeg';
      break;
    case 'application/msword':
      filetype = '.doc';
      break;
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      filetype = ".docx"
    default:
      return;
  }

  //TODO: change this to the order id.
  const newFileName = `${applicationStore.completeApplication.id.slice(-7)}_${
    completeApplication.personalInfo.lastName
  }_${completeApplication.personalInfo.firstName}_${target}${filetype}`;
  const newFile = new File([event], newFileName, { type: event.type });

  window.console.log(newFile);

  state.files.push(newFile);
}

async function handleFileUpload() {
  state.files.forEach(file => {
    axios.post(
      'http://localhost:5148/Api/Document/v1/Document/uploadApplicantFile',
      file
    );
  });
}

function handleSubmit() {
  state.uploadSuccessful = false;
  fileMutation.mutate();
}
</script>

<style lang="scss" scoped>
.text-line {
  display: flex;
  flex-direction: row;
}
</style>
