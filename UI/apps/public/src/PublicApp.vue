<!--eslint-disable vue-a11y/click-events-have-key-events -->
<template>
  <v-app>
    <!-- <v-container
      v-if="configIsLoading && !isError"
      fluid
    >
      <Loader />
    </v-container> -->
    <div
      
      id="client-app"
    >
      <PageTemplate>
        <router-view :key="$route.fullPath" />
      </PageTemplate>

      <!-- <div
        class="update-dialog"
        v-if="prompt"
      >
        <div class="update-dialog__content">
          {{ $t('A new version is found. Refresh to load it?') }}
        </div>
        <div class="update-dialog__actions">
          <button
            class="update-dialog__button update-dialog__button--confirm"
            @click="update"
          >
            {{ $t('Refresh') }}
          </button>
          <button
            class="update-dialog__button update-dialog__button--cancel"
            @click="prompt = false"
          >
            {{ $t('Cancel') }}
          </button>
        </div>
      </div> -->
    </div>
  </v-app>
</template>

<script setup lang="ts">
import Loader from './Loader.vue'
import PageTemplate from '@core-public/components/templates/PageTemplate.vue'
import initialize from '@core-public/api/config'
import { useBrandStore } from '@shared-ui/stores/brandStore'
import { useQuery } from '@tanstack/vue-query'
import Vue from 'vue'
import { useThemeStore } from '@shared-ui/stores/themeStore'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  provide,
  ref,
} from 'vue'
import {
  MsalBrowser,
  getMsalInstance,
} from '@shared-ui/api/auth/authentication'
import interceptors from '@core-public/api/interceptors'
import { useAppConfigStore } from '@shared-ui/stores/configStore'
import { useAuthStore } from '@shared-ui/stores/auth'

const prompt = ref(false)
const app = getCurrentInstance()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const configStore = useAppConfigStore()
const brandStore = useBrandStore()
const msalInstance = ref<MsalBrowser>()

provide(
  'msalInstance',
  computed(() => msalInstance.value)
)

const validApiUrl = computed(
  () => configStore.appConfig.applicationApiBaseUrl.length !== 0
)

useQuery(['brandSetting'], brandStore.getBrandSettingApi, {
  enabled: validApiUrl,
})

useQuery(['logo'], brandStore.getAgencyLogoDocumentsApi, {
  enabled: validApiUrl,
})

useQuery(['landingPageImage'], brandStore.getAgencyLandingPageImageApi, {
  enabled: validApiUrl,
})

onBeforeMount(async () => {
  Vue.prototype.$workbox.addEventListener('waiting', () => {
    prompt.value = true
  })

  msalInstance.value = await getMsalInstance()

  await interceptors(msalInstance.value)

  if (app) {
    app.proxy.$vuetify.theme.dark = themeStore.getThemeConfig.isDark
  }
})

// export default defineComponent({
//   name: 'App',
//   components: { PageTemplate },
//   methods: {
//     async update() {
//       this.prompt = false
//       await this.$workbox.messageSW({ type: 'SKIP_WAITING' })
//     },
//   },
//   data() {
//     return {
//       prompt: false,
//     }
//   },
//   created() {
//     if (this.$workbox) {
//       this.$workbox.addEventListener('waiting', () => {
//         this.prompt = true
//       })
//     }
//   },
//   setup() {
//     const app = getCurrentInstance()
//     const brandStore = useBrandStore()
//     const themeStore = useThemeStore()
//     const {
//       data,
//       isLoading: configIsLoading,
//       isError,
//     } = useQuery(['config'], initialize)
//     const apiUrl = computed(() => Boolean(data.value?.Configuration))

//     const { isLoading: brandIsLoading, isError: brandIsError } = useQuery(
//       ['brandSetting'],
//       brandStore.getBrandSettingApi,
//       {
//         enabled: apiUrl,
//       }
//     )

//     useQuery(['logo'], brandStore.getAgencyLogoDocumentsApi, {
//       enabled: apiUrl,
//     })

//     useQuery(['landingPageImage'], brandStore.getAgencyLandingPageImageApi, {
//       enabled: apiUrl,
//     })

//     app.proxy.$vuetify.theme.dark = themeStore.getThemeConfig.isDark

//     return { configIsLoading, isError, brandIsLoading, brandIsError }
//   },
// })
</script>
