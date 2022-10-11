import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { ContactInfoType } from '@shared-utils/types/defaultTypes';

export const useContactStore = defineStore('contact', () => {
  const contact = ref<ContactInfoType>({} as ContactInfoType);
  const getContactInfo = computed(() => contact.value);

  function setContactInfo(payload: ContactInfoType) {
    contact.value = payload;
  }

  function deleteContactInfo() {
    contact.value = {
      cellPhoneNumber: '',
      faxPhoneNumber: '',
      primaryPhoneNumber: '',
      textMessageUpdates: false,
      workPhoneNumber: '',
    };
  }

  return {
    contact,
    getContactInfo,
    setContactInfo,
    deleteContactInfo,
  };
});
