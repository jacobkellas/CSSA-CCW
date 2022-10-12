import { VuetifyThemeItem } from 'vuetify/types/services/theme';

export type BrandType = {
  id?: string;
  agencyName: string;
  agencySheriffName: string;
  chiefOfPoliceName: string;
  primaryThemeColor: string | VuetifyThemeItem;
  secondaryThemeColor: string | VuetifyThemeItem;
  agencyLogoDataURL: string | ArrayBuffer | null;
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
