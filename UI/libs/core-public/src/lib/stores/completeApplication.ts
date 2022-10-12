import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { usePublicAppConfigStore } from './publicAppConfig';
import axios, { AxiosResponse } from 'axios';
import { CompleteApplication } from '@shared-utils/types/defaultTypes';

export const useCompleteApplicationStore = defineStore(
  'completeApplicationStore',
  () => {
    const publicConfigStore = usePublicAppConfigStore();
    // TODO: Create the complete Application type
    const completeApplication = ref<CompleteApplication>(
      {} as CompleteApplication
    );

    /**
     * Get the complete application from the stored value
     * @type {ComputedRef<UnwrapRef<CompleteApplication>>}
     */
    const getCompleteApplication = computed(() => completeApplication.value);

    /**
     * Used to set the stored value from either the api call or the form
     * @param {CompleteApplication} payload
     */
    function setCompleteApplication(payload: CompleteApplication) {
      completeApplication.value = payload;
    }

    //
    /**
     * Get the complete application from the backend
     */
    async function getCompleteApplicationFromApi() {
      const res: any | AxiosResponse = await axios
        .get(`${publicConfigStore.getPublicAppConfig.apiBaseUrl}`)
        .catch(err => console.warn(err));
      setCompleteApplication(res.data);
      return res.data;
    }

    async function postCompleteApplicationFromApi(
      payload: CompleteApplication
    ) {
      const res: any | AxiosResponse = await axios
        .put(`${publicConfigStore.getPublicAppConfig.apiBaseUrl}`, payload)
        .catch(err => console.warn(err));
      return res.data;
    }
    return {
      getCompleteApplication,
      setCompleteApplication,
      getCompleteApplicationFromApi,
      postCompleteApplicationFromApi,
    };
  }
);
