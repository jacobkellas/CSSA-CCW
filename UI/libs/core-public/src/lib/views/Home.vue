<template>
  <div class="home">
    <!-- TODO: Make this the custom logo -->
    <img
      v-if="store.getDocuments.agencyLandingPageImage"
      alt="Application logo"
      :src="store.getDocuments.agencyLandingPageImage"
    />
    <v-container fluid>
      <v-row>
        <v-col
          cols="3"
          lg="2"
          sm="1"
        >
          <div class="option-section">
            <v-btn
              outlined
              color="primary"
              class="option-button"
              @click="handleRoute(Routes.APPLICATION_ROUTE_PATH)"
            >
              <div class="option-inner">
                <v-icon
                  x-large
                  color="primary"
                  class="mb-3"
                >
                  mdi-card-account-details
                </v-icon>
                {{ $t('NEW/EDIT CCW License') }}
              </div>
            </v-btn>
            <v-btn
              color="primary"
              class="option-button"
              outlined
              @click="handleRoute(Routes.RENEW_APPLICATION_ROUTE_PATH)"
            >
              <div class="option-inner">
                <v-icon
                  x-large
                  color="primary"
                  class="mb-3"
                >
                  mdi-card-account-details-star
                </v-icon>
                {{ $t('Modify/renew CCW License') }}
              </div>
            </v-btn>
          </div>
        </v-col>
        <v-col
          cols="7"
          lg="5"
          sm="1"
        >
          <GeneralInfoWrapper />
        </v-col>
        <v-col
          cols="6"
          lg="5"
          sm="1"
        >
          <PriceInfoWrapper />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import GeneralInfoWrapper from '@core-public/components/wrappers/GeneralInfoWrapper.vue';
import PriceInfoWrapper from '@core-public/components/wrappers/PriceInfoWrapper.vue';
import Routes from '@core-public/router/routes';
import { useBrandStore } from '@core-public/stores/brandStore';
import { useRouter } from 'vue-router/composables';

const store = useBrandStore();
const route = useRouter();

function handleRoute(path) {
  route.push(path);
}
</script>

<style lang="scss" scoped>
img {
  max-width: 30%;
  margin-top: 20px;
}
.option {
  &-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &-button {
    height: 6rem !important;
    padding: 0.5rem !important;
    margin: 0.5rem 0 !important;
    min-width: 16rem !important;
  }
  &-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
