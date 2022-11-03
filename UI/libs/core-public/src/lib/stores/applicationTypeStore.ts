import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useApplicationTypeStore = defineStore('applicationType', () => {
  const state = reactive({
    type: '',
  });

  return {
    state,
  };
});
