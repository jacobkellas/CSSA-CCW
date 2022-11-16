/**
 * Routes file
 * This is a helper file to reference page routes to be used in
 * the various JS files across the site.
 */
export default class Routes {
  static get HOME_ROUTE_PATH() {
    return `/`;
  }

  static get APPLICATION_ROUTE_PATH() {
    return `/application`;
  }

  static get APPLICATION_STATUS_PATH() {
    return '/application-status';
  }

  static get FINALIZE_ROUTE_PATH() {
    return `/finalize`;
  }

  static get FORM_ROUTE_PATH() {
    return `/form`;
  }

  static get FORM_TWO_ROUTE_PATH() {
    return `/form-2`;
  }

  static get MORE_INFORMATION_ROUTE_PATH() {
    return `/more-information`;
  }

  static get PENAL_CODE_PATH() {
    return `/penal-code`;
  }

  static get QUALIFYING_QUESTIONS_ROUTE_PATH() {
    return `/qualifying-questions`;
  }

  static get RECIEPT_PATH() {
    return '/reciept';
  }
  static get RENEW_APPLICATION_ROUTE_PATH() {
    return `/renew-application`;
  }

  static get RENEW_FORM_ROUTE_PATH() {
    return `/renew-form`;
  }

  static get RENEW_FORM_TWO_ROUTE_PATH() {
    return `/renew-form-2`;
  }
}
