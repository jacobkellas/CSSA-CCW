<template>
  <div class="form-btn-container">
    <div>
      <v-btn
        color="success "
        @click="handleSubmit"
        :disabled="!valid"
      >
        {{ $t('Continue') }}
      </v-btn>

      <v-btn
        color="secondary mx-2"
        @click="handleSave"
      >
        {{ $t('Save and Exit') }}
      </v-btn>
    </div>
    <div>
      <v-btn
        color="warning mx-2"
        @click="handleBack"
      >
        {{ $t('Go back') }}
      </v-btn>

      <!-- TODO: Make this return to the home page with out saving the form at all -->
      <v-btn
        color="error mr-2"
        @click="handleCancel"
      >
        {{ $t('Cancel') }}
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
interface FormButtonContainerProps {
  valid?: boolean;
}

const props = withDefaults(defineProps<FormButtonContainerProps>(), {
  valid: false,
});

const emit = defineEmits(['submit', 'save', 'back', 'cancel']);

function handleSubmit() {
  emit('submit');
}

function handleSave() {
  emit('save');
}

function handleBack() {
  emit('back');
}

function handleCancel() {
  emit('cancel');
}
</script>

<style lang="scss" scoped>
.form-btn-container {
  width: 90%;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
}
</style>
