import { useAppConfigStore } from '@shared-ui/stores/appConfig';

export default class Endpoints {
  /********CONFIG******************/

  static get GET_CONFIG_ENDPOINT() {
    return '/config.json';
  }

  /********SYSTEM SETTINGS******************/

  static get GET_SETTINGS_ENDPOINT() {
    return `${
      useAppConfigStore().getAppConfig.apiBaseUrl
    }/admin/v1/systemsettings/get`;
  }

  static get PUT_SETTINGS_ENDPOINT() {
    return `${
      useAppConfigStore().getAppConfig.apiBaseUrl
    }/admin/v1/systemsettings/update`;
  }

  /********PERMITS******************/

  static get GET_PERMIT_ENDPOINT() {
    return `${
      useAppConfigStore().getAppConfig.apiBaseUrl
    }/application/v1/permitapplication/get`;
  }

  static get GET_ALL_PERMITS_ENDPOINT() {
    return `${
      useAppConfigStore().getAppConfig.apiBaseUrl
    }/application/v1/permitapplication/getAll`;
  }

  static get PUT_UPDATE_PERMIT_ENDPOINT() {
    return `${
      useAppConfigStore().getAppConfig.apiBaseUrl
    }/application/v1/permitapplication/update`;
  }

  static get PUT_CREATE_PERMIT_ENDPOINT() {
    return `${
      useAppConfigStore().getAppConfig.apiBaseUrl
    }/application/v1/permitapplication/create`;
  }

  /********APPOINTMENTS******************/

  static get GET_APPOINTMENTS_ENDPOINT() {
    return `http://localhost:5108/api/schedule/v1/appointment/getAll`;
  }

  static get GET_AVAILABLE_APPOINTMENTS_ENDPOINT() {
    return `http://localhost:5108/api/schedule/v1/appointment/getAvailability`;
  }

  static get PUT_APPOINTMENTS_ENDPOINT() {
    return `http://localhost:5108/api/schedule/v1/appointment/update`;
  }

  /********USER PROFILE******************/

  static get POST_VERIFY_USER_ENDPOINT() {
    return `http://localhost:5177/api/userprofile/v1/user/verifyEmail`;
  }

  static get PUT_CREATE_USER_ENDPOINT() {
    return `http://localhost:5177/api/userprofile/v1/user/create`;
  }

  /********DOCUMENTS******************/

  static get GET_DOCUMENT_AGENCY_ENDPOINT() {
    return `http://localhost:5148/api/document/v1/document/downloadAgencyLogo`;
  }

  static get POST_DOCUMENT_AGENCY_ENDPOINT() {
    return `http://localhost:5148/api/document/v1/document/uploadAgencyLogo`;
  }

  static get POST_DOCUMENT_IMAGE_ENDPOINT() {
    return `${
      useAppConfigStore().getAppConfig.apiBaseUrl
    }/document/v1/document/uploadImage`;
  }

  static get POST_DOCUMENT_FILE_ENDPOINT() {
    return `${
      useAppConfigStore().getAppConfig.apiBaseUrl
    }/document/v1/document/uploadImage`;
  }
}
