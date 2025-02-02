import Endpoints from '@shared-ui/api/endpoints'
import axios from 'axios'
import interceptors from '@core-public/api/interceptors'
import { useAppConfigStore } from '@shared-ui/stores/configStore'

const initialize = async () => {
  const res = await axios.get(Endpoints.GET_CONFIG_ENDPOINT)
  const configStore = useAppConfigStore()

  const config = {
    apiBaseUrl: res.data.Configuration.ServicesBaseUrl,
    adminApiBaseUrl: res.data.Configuration.AdminServicesBaseUrl,
    applicationApiBaseUrl: res.data.Configuration.ApplicationServicesBaseUrl,
    documentApiBaseUrl: res.data.Configuration.DocumentServicesBaseUrl,
    paymentApiBaseUrl: res.data.Configuration.PaymentServicesBaseUrl,
    scheduleApiBaseUrl: res.data.Configuration.ScheduleServicesBaseUrl,
    userProfileApiBaseUrl: res.data.Configuration.UserProfileServicesBaseUrl,
    apiSubscription: res.data.Configuration.Subscription,
    authorityUrl: res.data.Authentication.AuthorityUrl,
    knownAuthorities: res.data.Authentication.KnownAuthorities,
    clientId: res.data.Authentication.ClientId,
    defaultCounty: res.data.Configuration.DefaultCounty,
    displayDebugger: res.data.Configuration.DisplayDebugger === 'True',
    environmentName: res.data.Configuration?.Environment.toUpperCase() || 'DEV',
    loginType: res.data.Authentication.LoginType || 'Popup',
    refreshTime: res.data.Authentication.RefreshTimeInMinutes || 30,
    questions: res.data.Questions,
  }

  configStore.setAppConfig(config)

  await interceptors()

  return res.data
}

export default initialize
