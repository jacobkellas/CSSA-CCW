import BrandLogo from '@core-admin/components/brand/BrandLogo.vue';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';

const localVue = createLocalVue();

describe('BrandLogo', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('Should render logo label', () => {
    const wrapper = mount(BrandLogo, {
      localVue,
      vuetify,
      mocks: {
        $t: text => {
          text;
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('.v-input').exists()).toBe(true);
  });
});
