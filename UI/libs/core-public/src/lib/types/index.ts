import { VuetifyThemeItem } from 'vuetify/types/services/theme';

export type BrandType = {
  id?: string;
  agencyName: string;
  agencySheriffName: string;
  chiefOfPoliceName: string;
  primaryThemeColor: string | VuetifyThemeItem;
  secondaryThemeColor: string | VuetifyThemeItem;
  standardCost: number;
  judicialCost: number;
  reserveCost: number;
  creditFee: number;
  convenienceFee: number;
  paymentURL: string;
  refreshTokenTime: number;
};

export type AgencyDocumentsType = {
  agencyLogo: string | undefined;
  agencyLandingPageImage: string | undefined;
};

export type PublicAppConfigType = {
  apiBaseUrl: string;
  apiSubscription: string;
  authorityUrl: string;
  knownAuthorities: Array<string>;
  clientId: string;
  defaultCounty: string;
  displayDebugger: boolean;
  environmentName: string;
  loginType: string;
  refreshTime: number;
};
