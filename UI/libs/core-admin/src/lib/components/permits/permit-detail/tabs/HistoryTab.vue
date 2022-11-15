<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
<template>
  <v-card elevation="3">
    <v-card-title class="text-h5">
      {{ $t('History:') }}
      <v-spacer></v-spacer>
      <v-btn
        :outlined="interval == null"
        :color="interval == null ? 'primary' : 'error'"
        @click="interval == null ? start() : stop()"
      >
        Realtime
      </v-btn>
    </v-card-title>
    <v-row class="ml-5">
      <v-col cols="12">
        <v-card-text>
          <v-timeline dense>
            <v-slide-x-reverse-transition
              group
              origin
              leave-absolute
            >
              <v-timeline-item
                v-for="item in items"
                :key="item.id"
                :color="item.color"
                class="mb-4"
                medium
                fill-dot
              >
                <template #icon>
                  <span class="white--text">SG</span>
                </template>
                <v-row justify="space-between">
                  <v-col cols="6">
                    <v-chip
                      class="white--text ml-0"
                      :color="item.color"
                      label
                      medium
                    >
                      ID Information
                    </v-chip>
                    SSN was provided
                  </v-col>
                  <v-col
                    class="text-right"
                    cols="6"
                  >
                    15:25 EDT
                  </v-col>
                </v-row>
              </v-timeline-item>
            </v-slide-x-reverse-transition>
          </v-timeline>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>
<script lang="ts">
const COLORS = ['info', 'warning', 'error', 'success'];
const ICONS = {
  info: 'mdi-information',
  warning: 'mdi-alert',
  error: 'mdi-alert-circle',
  success: 'mdi-check-circle',
};

export default {
  data: () => ({
    interval: null,
    items: [
      {
        id: 1,
        color: 'info',
        icon: ICONS.info,
      },
    ],
    nonce: 2,
  }),

  computed: {
    isPermitDetail() {
      return this.$route.name === 'PermitDetail';
    },
  },

  beforeDestroy() {
    this.stop();
  },

  methods: {
    addEvent() {
      let { color, icon } = this.genAlert();

      const previousColor = this.items[0].color;

      while (previousColor === color) {
        color = this.genColor();
      }

      this.items.unshift({
        id: this.nonce++,
        color,
        icon,
      });

      if (this.nonce > 10) {
        this.items.pop();
      }
    },
    genAlert() {
      const color = this.genColor();

      return {
        color,
        icon: this.genIcon(color),
      };
    },
    genColor() {
      return COLORS[Math.floor(Math.random() * 3)];
    },
    genIcon(color) {
      return ICONS[color];
    },
    start() {
      this.interval = setInterval(this.addEvent, 3000);
    },
    stop() {
      clearInterval(this.interval);
      this.interval = null;
    },
  },
};
</script>
