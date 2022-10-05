<template>
  <v-card class="acknowledgement-card elevation-4">
    <v-card-title>
      {{ $t('Acknowledgement x of x') }}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          {{ tempText }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <AcknowledgementButtonContainer
            @accept="handleFinalAccept"
            @decline="handleDecline"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import AcknowledgementButtonContainer from '@shared-ui/components/containers/AcknowledgementButtonContainer.vue';

const tempText = ' last acknowledgement then proceed to form.';
interface IAcknowledgmentFinalProps {
  handleFinalAccept: CallableFunction;
  handleDecline: CallableFunction;
}

const props = defineProps<IAcknowledgmentFinalProps>();
</script>

<style lang="scss" scoped>
.acknowledgement {
  &-card {
    width: 100%;
  }
}
</style>
