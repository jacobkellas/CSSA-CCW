import Endpoints from '@shared-ui/api/endpoints';
import axios from 'axios';
import { defaultPermitState } from '@shared-utils/lists/defaultConstants';
import { defineStore } from 'pinia';
import { useAuthStore } from '@shared-ui/stores/auth';
import {
  CompleteApplication,
  HistoryType,
} from '@shared-utils/types/defaultTypes';
import { computed, reactive } from 'vue';

export const useCompleteApplicationStore = defineStore(
  'completeApplicationStore',
  () => {
    const authStore = useAuthStore();
    const completeApplication =
      reactive<CompleteApplication>(defaultPermitState);
    /**
     * Get the complete application from the stored value
     * @type {ComputedRef<UnwrapRef<CompleteApplication>>}
     */
    const getCompleteApplication = computed(() => completeApplication);

    /**
     * Used to set the stored value from either the api call or the form
     * @param {CompleteApplication} payload
     */
    function setCompleteApplication(payload: CompleteApplication) {
      completeApplication.application = payload.application;
      completeApplication.id = payload.id;
    }

    //
    /**
     * Get the complete application from the backend
     */
    async function getCompleteApplicationFromApi(
      userEmail: string,
      isComplete: boolean
    ) {
      const res = await axios
        .get(Endpoints.GET_PERMIT_ENDPOINT, {
          params: { userEmail, isComplete },
        })

        .catch(err => console.warn(err));

      //TODO: add back in once the api is corrected.
      //setCompleteApplication(res?.data);
      return res?.data;
    }

    async function createApplication() {
      const applicationId = completeApplication.id;
      const date = new Date(Date.now()).toUTCString();
      const historyLog: Array<HistoryType> = [
        {
          change: 'Created application',
          dateTime: date,
          changeMadeBy: authStore.auth.userEmail,
        },
      ];

      completeApplication.application.history = historyLog;
      const body = {
        application: completeApplication,
        id: applicationId,
      };

      await axios.put(Endpoints.PUT_CREATE_PERMIT_ENDPOINT, body).catch(err => {
        window.console.log(err);

        return Promise.reject();
      });
    }

    async function updateApplication(changeMessage: string) {
      const date = new Date(Date.now()).toUTCString();

      completeApplication.application.history = [
        {
          change: changeMessage,
          dateTime: date,
          changeMadeBy: authStore.auth.userEmail,
        },
      ];

      const res = await axios
        .put(Endpoints.PUT_UPDATE_PERMIT_ENDPOINT, completeApplication)
        .catch(err => {
          console.warn(err);

          return Promise.reject();
        });

      return res?.data;
    }

    return {
      completeApplication,
      createApplication,
      getCompleteApplication,
      setCompleteApplication,
      getCompleteApplicationFromApi,
      updateApplication,
    };
  }
);
