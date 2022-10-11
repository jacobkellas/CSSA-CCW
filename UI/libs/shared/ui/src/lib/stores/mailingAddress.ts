import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { AddressInfoType } from '@shared-utils/types/defaultTypes';

export const useMailingAddressStore = defineStore('mailingAddress', () => {
  const mailingAddress = ref({} as AddressInfoType);
  const getMailingAddress = computed(() => mailingAddress.value);

  function setMailingAddress(payload: AddressInfoType) {
    mailingAddress.value = payload;
  }
  return {
    getMailingAddress,
    setMailingAddress,
  };
});
