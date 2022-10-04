<template>
  <v-container>
    <div>
      {{ tempText }}
    </div>
    <div>
      <AcknowledgementFinal
        :handle-final-accept="handleFinalAccept"
        :handle-decline="handleDecline"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router/composables';
import AcknowledgementFinal from '@core-public/components/acknoledgement-step/AcknowledgementFinal.vue';

const router = useRouter();

const tempText =
  ' This will contain a number of components that will be required for acknoledgements';

// function handleAccept() {
//   return;
// }

function handleDecline() {
  return;
}

function handleFinalAccept() {
  router.push('form');
}
</script>

<style lang="scss" scoped></style>
