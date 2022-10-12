import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { PersonalInfoType } from '@shared-utils/types/defaultTypes';

export const usePersonalInfoStore = defineStore('personalInfo', () => {
  const personalInfo = ref({} as PersonalInfoType);
  const getPersonalInfo = computed(() => personalInfo.value);

  function setPersonalInfo(payload) {
    personalInfo.value = payload;
  }

  function deletePersonalInfo() {
    personalInfo.value = {
      lastName: '',
      firstName: '',
      middleName: '',
      noMiddleName: false,
      maidenName: '',
      suffix: '',
      ssn: '',
      maritalStatus: '',
    };
  }

  return {
    personalInfo,
    getPersonalInfo,
    setPersonalInfo,
    deletePersonalInfo,
  };
});
