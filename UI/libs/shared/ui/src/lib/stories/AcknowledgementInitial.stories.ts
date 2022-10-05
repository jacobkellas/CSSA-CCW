import { withKnobs } from '@storybook/addon-knobs';
import AcknowledgementInitial from '../components/acknowledgement-section/AcknowledgementInitial.vue';

export default {
  title: 'AcknowledgementInitial',
  decorators: [withKnobs],
};

export const AcknowledgementInitial = () => ({
  props: {
    handleAccept: () => null,
    handleDecline: () => null,
  },

  components: { AcknowledgementInitial },
  template: `<AcknowledgementInitial :handle-accept='$props.handleAccept' :handle-decline='$props.handleDecline'></AcknowledgementInitial>`,
});

AcknowledgementInitial.story = {
  name: 'AcknowledgementInitial',
};
