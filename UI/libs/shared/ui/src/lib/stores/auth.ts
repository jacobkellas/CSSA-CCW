import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useAppConfigStore } from '@shared-ui/stores/appConfig';
import { AuthType } from '@shared-utils/types/defaultTypes';

export const useAuthStore = defineStore(
  'AuthStore',
  () => {
    const appConfigStore = useAppConfigStore();
    const auth = ref<AuthType>({
      userName: '',
      userEmail: '',
      jwtToken: '',
      isAuthenticated: false,
      isAdmin: false,
      verifiedUser: false,
      roles: [],
    });

    const getAuthState = computed(() => auth.value);

    const setUser = name => {
      auth.value.userName = name;
    };

    const setUserEmail = email => {
      auth.value.userEmail = email;
    };

    const setVerifiedUser = value => {
      auth.value.verifiedUser = value;
    };

    const setToken = token => {
      auth.value.jwtToken = token;
    };

    const setIsAuthenticated = value => {
      auth.value.isAuthenticated = value;
    };

    const setRoles = value => {
      auth.value.roles = value;
    };

    const resetStore = () => {
      auth.value.userName = '';
      auth.value.userEmail = '';
      auth.value.jwtToken = '';
      auth.value.isAuthenticated = false;
      auth.value.isAdmin = false;
      auth.value.verifiedUser = false;
      auth.value.roles = [];
    };

    async function postVerifyUserApi() {
      const res = await axios
        .post(
          `${appConfigStore.getAppConfig.apiBaseUrl}/v1/User/verifyEmail?userEmail=${getAuthState.value.userEmail}`
        )
        .catch(err => console.warn(err));
      if (res?.data.statusCode === 404) {
        await putCreateUserApi();
      }
      setVerifiedUser(res?.data.isSuccessStatusCode);
      return res?.data;
    }

    async function putCreateUserApi() {
      const payload = { emailAddress: getAuthState.value.userEmail };
      const res = await axios
        .put(
          `${appConfigStore.getAppConfig.apiBaseUrl}/v1/User/create`,
          payload
        )
        .catch(err => console.warn(err));
      setVerifiedUser(res?.data.id ? true : false);
      return res?.data;
    }

    return {
      auth,
      getAuthState,
      setUser,
      setUserEmail,
      setToken,
      setIsAuthenticated,
      setRoles,
      resetStore,
      postVerifyUserApi,
      putCreateUserApi,
    };
  },
  {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    persist: true,
  }
);
