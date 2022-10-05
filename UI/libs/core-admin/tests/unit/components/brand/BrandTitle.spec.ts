import BrandTitle from '@core-admin/components/brand/BrandTitle.vue';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';

const localVue = createLocalVue();

describe('BrandTitle', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('Should render logo label', () => {
    const wrapper = mount(BrandTitle, {
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
