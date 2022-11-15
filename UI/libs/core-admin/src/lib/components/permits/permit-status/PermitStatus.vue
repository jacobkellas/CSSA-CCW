<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
<template>
  <v-navigation-drawer
    v-if="isPermitDetail"
    app
    v-model="drawer"
    :mini-variant.sync="mini"
    class="sidebar"
    clipped
    permanent
    right
  >
    <v-list
      nav
      dense
    >
      <v-list-item
        link
        @click.stop="mini = !mini"
      >
        <v-list-item-icon>
          <v-icon>
            {{ mini ? 'mdi-chevron-double-left' : 'mdi-chevron-double-right' }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t('Permit Status') }}</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-folder-move</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t('Move Order') }}</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon color="warning">mdi-history</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('Permit Pending') }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon color="green">mdi-checkbox-marked</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t('Approve Permit') }}</v-list-item-title>
      </v-list-item>
      <v-list-item
        to="/work"
        link
      >
        <v-list-item-icon>
          <v-icon color="error">mdi-close-box</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t('Deny Permit') }}</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-keyboard-return</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t('Withdraw') }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router/composables';
import { computed, ref } from 'vue';

const route = useRoute();

const drawer = ref(true);
const mini = ref(false);

const isPermitDetail = computed(() => route.name === 'PermitDetail');
</script>

<style lang="scss" scoped>
.sidebar {
  max-width: 265px;

  .theme--light .logo {
    &::before {
      opacity: 0 !important;
    }

    .v-list-item__title {
      color: #344054;
    }
  }

  .theme--dark {
    .logo {
      background: transparent !important;

      .v-list-item__title {
        color: white;
      }
    }

    .v-list-item {
      &__title {
        color: white;
      }
    }
  }

  .v-list-item {
    height: 46px;

    &__title {
      text-align: left;
      font-size: 16px;
      line-height: 26px;
      color: #667085;
    }

    &__subtitle {
      text-align: left;
    }

    &:not(:last-child):not(:only-child) {
      margin-bottom: 8px;
    }

    &--active:not(:first-child) {
      background: #eff8ff;
      color: #2e90fa;

      .v-list-item__title {
        color: #2e90fa;
      }
    }

    &--active:first-child {
      background: #ffffff;
    }
  }
}
</style>
