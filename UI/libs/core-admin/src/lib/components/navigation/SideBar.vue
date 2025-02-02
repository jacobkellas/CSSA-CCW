<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div>
    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant.sync="mini"
      @transitionend="onTransitionEnd"
      :color="app?.proxy.$vuetify.theme.dark ? 'grey darken-4' : ''"
    >
      <v-list nav>
        <v-list-item
          @click="$router.push(Routes.HOME_ROUTE_PATH)"
          class="px-0"
        >
          <v-list-item-avatar class="mr-1">
            <v-skeleton-loader
              v-if="isLoading"
              type="card-avatar"
            />
            <v-img
              v-else
              :src="brandStore.getDocuments.agencyLogo"
              alt="Image"
              contain
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title :class="wrapText ? 'text-wrap' : ''">
              {{ getAppTitle.name }} <small>{{ getAppTitle.env }}</small>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <SearchBar />
        </v-list-item>

        <v-list dense>
          <v-list-item
            :to="Routes.HOME_ROUTE_PATH"
            link
          >
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-left">
                {{ $t('Dashboard') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            :to="Routes.APPOINTMENTS_ROUTE_PATH"
            link
          >
            <v-list-item-icon>
              <v-icon>mdi-calendar-blank-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-left">
              {{ $t('Appointments') }}
              <v-chip
                v-if="aptStore.getNewAptCount !== 0"
                class="ml-5 font-weight-bold"
                :color="$vuetify.theme.dark ? '' : 'light-blue lighten-4'"
                x-small
              >
                {{ aptStore.getNewAptCount }}
              </v-chip>
            </v-list-item-title>
          </v-list-item>

          <v-list-item
            :to="Routes.PERMITS_ROUTE_PATH"
            link
          >
            <v-list-item-icon>
              <v-icon>mdi-file-document</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-left">
              {{ $t('Applications') }}
              <v-chip
                v-if="permitStore.getOpenPermits !== 0"
                class="ml-8 font-weight-bold"
                :color="$vuetify.theme.dark ? '' : 'light-blue lighten-4'"
                x-small
              >
                {{ permitStore.getOpenPermits }}
              </v-chip>
            </v-list-item-title>
          </v-list-item>

          <v-list-item
            :to="Routes.SETTINGS_ROUTE_PATH"
            link
          >
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-left">
              {{ $t('Admin Settings') }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-list>

      <template #append>
        <v-list
          dense
          nav
        >
          <v-list-item @click="mini = !mini">
            <v-list-item-icon>
              <v-icon>
                {{ mini ? 'mdi-menu-right-outline' : 'mdi-menu-left-outline' }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-left">
              {{ $t('Collapse Menu') }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">
import Routes from '@core-admin/router/routes'
import SearchBar from '@core-admin/components/search/SearchBar.vue'
import { useAppointmentsStore } from '@shared-ui/stores/appointmentsStore'
import { useBrandStore } from '@shared-ui/stores/brandStore'
import useEnvName from '@shared-ui/composables/useEnvName'
import { usePermitsStore } from '@core-admin/stores/permitsStore'
import { useQuery } from '@tanstack/vue-query'
import { getCurrentInstance, ref, watch } from 'vue'

interface ISideBarProps {
  expandMenu: boolean
}

const props = withDefaults(defineProps<ISideBarProps>(), {
  expandMenu: true,
})

const emit = defineEmits(['on-change-drawer'])

const mini = ref(false)
const wrapText = ref(true)
const drawer = ref(true)
const aptStore = useAppointmentsStore()
const permitStore = usePermitsStore()
const brandStore = useBrandStore()
const app = getCurrentInstance()

const { isLoading } = useQuery(['logo'])

const getAppTitle = useEnvName()

function onTransitionEnd() {
  mini.value ? (wrapText.value = false) : (wrapText.value = true)
}

watch(
  () => props.expandMenu,
  () => {
    drawer.value = !drawer.value
  }
)
watch(
  () => drawer.value,
  () => {
    emit('on-change-drawer')
  }
)
</script>
