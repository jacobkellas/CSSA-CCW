<template>
  <v-card
    color="lighten-1"
    class="mb-8 ml-2 mr-2 mt-6 elevation-3"
    height="100%"
  >
    <v-progress-linear
      :active="isLoading && isFetching"
      :indeterminate="isLoading && isFetching"
      absolute
      bottom
      color="primary"
    >
    </v-progress-linear>
    <v-form
      ref="form"
      class="ml-4"
      v-model="valid"
      lazy-validation
    >
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            :label="$t('Standard Cost')"
            :rules="[v => !!v || $t('Standard Cost is required')]"
            :hint="$t('Add standard cost fees for permit ')"
            v-model="brandStore.getBrand.standardCost"
            placeholder="XX.XX"
            type="number"
            color="blue1"
            clearable
            prefix="$"
            required
          >
            <template #prepend>
              <v-icon
                x-small
                color="error"
              >
                mdi-star
              </v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            :label="$t('Judicial Cost')"
            :rules="[v => !!v || $t('Judicial Cost is required')]"
            :hint="$t('Add judicial cost fees for permit ')"
            v-model="brandStore.getBrand.judicialCost"
            placeholder="XX.XX"
            type="number"
            color="blue1"
            clearable
            prefix="$"
            required
          >
            <template #prepend>
              <v-icon
                x-small
                color="error"
              >
                mdi-star
              </v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            :label="$t('Reserve Cost')"
            :rules="[v => !!v || $t('Reserve Cost is required')]"
            :hint="$t('Add reserve cost fees for permit ')"
            v-model="brandStore.getBrand.reserveCost"
            placeholder="XX.XX"
            type="number"
            color="blue1"
            clearable
            prefix="$"
            required
          >
            <template #prepend>
              <v-icon
                x-small
                color="error"
              >
                mdi-star
              </v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            :label="$t('Credit Fee')"
            :rules="[v => !!v || $t('Credit Fee is required')]"
            :hint="$t('Add credit fee for permit ')"
            v-model="brandStore.getBrand.creditFee"
            placeholder="XX.XX"
            type="number"
            color="blue1"
            clearable
            prefix="$"
            required
          >
            <template #prepend>
              <v-icon
                x-small
                color="error"
              >
                mdi-star
              </v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            :label="$t('Convenience Fee')"
            :rules="[v => !!v || $t('Convenience Fee is required')]"
            :hint="$t('Add Convenience Fee for permit ')"
            v-model="brandStore.getBrand.convenienceFee"
            placeholder="XX.XX"
            type="number"
            color="blue1"
            clearable
            prefix="$"
            required
          >
            <template #prepend>
              <v-icon
                x-small
                color="error"
              >
                mdi-star
              </v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col
          cols="12"
          sm="6"
        >
          <v-btn @click="handleResetStep">
            {{ $t('Cancel') }}
          </v-btn>
          <v-btn @click="props.handleBackStep">
            {{ $t('Back') }}
          </v-btn>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-btn
            color="primary"
            :disabled="!valid"
            @click="getFormValues"
          >
            {{ $t('Publish') }}
          </v-btn>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
    </v-form>
  </v-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useBrandStore } from '@core-admin/stores/brandStore';
import { useQuery } from '@tanstack/vue-query';

interface IAgencyFormStepProps {
  handleNextStep: () => void;
  handleBackStep: () => void;
  handleResetStep: () => void;
}

const props = withDefaults(defineProps<IAgencyFormStepProps>(), {
  handleNextStep: () => null,
  handleBackStep: () => null,
  handleResetStep: () => null,
});

const brandStore = useBrandStore();
const valid = ref(false);

const {
  isLoading,
  isFetching,
  refetch: queryBrandSettings,
} = useQuery(['setBrandSettings'], brandStore.setBrandSettingApi, {
  enabled: false,
  onSuccess: () => {
    props.handleNextStep();
  },
});

async function getFormValues() {
  queryBrandSettings();
}
</script>
