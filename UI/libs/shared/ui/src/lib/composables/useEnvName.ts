import { computed } from 'vue';
import { useAppConfigStore } from '@shared-ui/stores/appConfig';

export default function useEnvName() {
  const appStore = useAppConfigStore();

  const getAppTitle = computed(() => {
    switch (appStore.getAppConfig.environmentName) {
      case 'DEV':
        return 'CCW (DEV)';
      case 'QA':
        return 'CCW (QA)';
      default:
        return 'CCW';
    }
  });

  return getAppTitle;
}
