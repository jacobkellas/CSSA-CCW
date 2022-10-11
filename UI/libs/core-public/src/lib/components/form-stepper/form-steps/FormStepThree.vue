<template>
  <div>
    <v-subheader class="sub-header font-weight-bold">
      {{ $t('Address Information') }}
    </v-subheader>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-row class="ml-5">
        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <v-text-field
            :label="$t('Address line 1')"
            :rules="[v => !!v || $t('Address line 1 cannot be blank')]"
            v-model="address.addressLine1"
          />
        </v-col>

        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <v-text-field
            :label="$t('Address line 2')"
            v-model="address.addressLine2"
          />
        </v-col>
      </v-row>

      <v-row class="ml-5">
        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <v-text-field
            :label="$t('City')"
            :rules="[v => !!v || $t('City cannot be blank')]"
            v-model="address.city"
          />
        </v-col>

        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <v-text-field
            :label="$t('State')"
            :rules="[v => !!v || $t('State cannot be blank')]"
            v-model="address.state"
          />
        </v-col>
        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <v-text-field
            :label="$t('County')"
            :rules="[v => !!v || $t('County cannot be blank')]"
            v-model="address.county"
          />
        </v-col>
        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <v-text-field
            :label="$t('Zip')"
            :rules="[v => !!v || $t('Zip cannot be blank')]"
            v-model="address.zip"
          />
        </v-col>

        <v-col
          cols="6"
          md="5"
          sm="3"
        >
          <v-text-field
            :label="$t('Country')"
            :rules="[v => !!v || 'Country cannot be blank']"
            v-model="address.country"
          />
        </v-col>
      </v-row>
      <v-divider />
      <v-row class="ml-5 my-5">
        <v-checkbox
          :label="$t('Different Mailing address')"
          v-model="differentMailingAddress"
        />
      </v-row>
      <div v-if="differentMailingAddress">
        <v-row class="ml-5">
          <v-col
            cols="6"
            md="5"
            sm="3"
          >
            <v-text-field
              :label="$t('Address line 1')"
              :rules="[v => !!v || $t('Address line 1 cannot be blank')]"
              v-model="mailingAddress.addressLine1"
            />
          </v-col>

          <v-col
            cols="6"
            md="5"
            sm="3"
          >
            <v-text-field
              :label="$t('Address line 2')"
              v-model="mailingAddress.addressLine2"
            />
          </v-col>
        </v-row>

        <v-row class="ml-5">
          <v-col
            cols="6"
            md="5"
            sm="3"
          >
            <v-text-field
              :label="$t('City')"
              :rules="[v => !!v || $t(' City cannot be blank')]"
              v-model="mailingAddress.city"
            />
          </v-col>

          <v-col
            cols="6"
            md="5"
            sm="3"
          >
            <v-text-field
              :label="$t('State')"
              :rules="[v => !!v || $t('State cannot be blank')]"
              v-model="mailingAddress.state"
            />
          </v-col>
          <v-col
            cols="6"
            md="5"
            sm="3"
          >
            <v-text-field
              :label="$t('County')"
              :rules="[v => !!v || $t('County cannot be blank')]"
              v-model="mailingAddress.county"
            />
          </v-col>
          <v-col
            cols="6"
            md="5"
            sm="3"
          >
            <v-text-field
              :label="$t('Zip')"
              :rules="[v => !!v || $t('Zip cannot be blank')]"
              v-model="mailingAddress.zip"
            />
          </v-col>

          <v-col
            cols="6"
            md="5"
            sm="3"
          >
            <v-text-field
              :label="$t('Country')"
              :rules="[v => !!v || $t('Country cannot be blank')]"
              v-model="mailingAddress.country"
            />
          </v-col>
        </v-row>
      </div>
      <v-divider />
      <v-subheader class="sub-header font-weight-bold">
        {{ $t(' Previous Address') }}
      </v-subheader>
      <div class="previous-address-container">
        <address-table :addresses="previousAddress" />
        <PreviousAddressDialog
          :get-previous-address-from-dialog="getPreviousAddressFromDialog"
        />
      </div>
      <FormButtonContainer
        :valid="valid"
        @submit="handleSubmit"
      />
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useCurrentAddressStore } from '@shared-ui/stores/currentAddress';
import { usePreviousAddressesStore } from '@shared-ui/stores/previousAddress';
import { AddressInfoType } from '@shared-utils/types/defaultTypes';
import PreviousAddressDialog from '../../dialogs/PreviousAddressDialog.vue';
import AddressTable from '@shared-ui/components/tables/AddressTable.vue';
import FormButtonContainer from '@core-public/components/containers/FormButtonContainer.vue';
import { useDifferentMailingAddressStore } from '@shared-ui/stores/differentMailing';
import { useMailingAddressStore } from '@shared-ui/stores/mailingAddress';

interface FormStepThreeProps {
  handleNextSection: () => void;
}

const props = withDefaults(defineProps<FormStepThreeProps>(), {
  handleNextSection: () => null,
});

const address = reactive({} as AddressInfoType);
const previousAddress = ref([] as Array<AddressInfoType>);
const valid = ref(false);
const differentMailingAddress = ref(false);
const mailingAddress = reactive({} as AddressInfoType);

const currentAddressStore = useCurrentAddressStore();
const previousAddressesStore = usePreviousAddressesStore();
const differentMailingAddressStore = useDifferentMailingAddressStore();
const mailingAddressStore = useMailingAddressStore();

function getPreviousAddressFromDialog(address: AddressInfoType) {
  previousAddress.value.push(address);
}

function handleSubmit() {
  currentAddressStore.setCurrentAddress(address);
  previousAddressesStore.setPreviousAddresses(previousAddress.value);
  if (differentMailingAddress) {
    differentMailingAddressStore.setDifferentMailingAddress(
      differentMailingAddress.value
    );
    mailingAddressStore.setMailingAddress(mailingAddress);
  }

  props.handleNextSection();
}
</script>

<style lang="scss" scoped>
.sub-header {
  font-size: 1.5rem;
}
.previous-address-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
