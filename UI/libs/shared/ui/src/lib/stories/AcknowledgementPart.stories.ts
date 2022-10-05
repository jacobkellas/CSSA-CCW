import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'AcknowledgmentPart',
  decorators: [withKnobs],
};

export const AcknowledgementPart = () => ({
  props: {
    handleAccept: () => null,
    handleDecline: () => null,
    textBody: 'test text',
  },

  components: { AcknowledgementPart },
  template: `<AcknowledgementPart :handle-accept='$props.handleAccept' :handle-decline='$props.handleDecline' :text-body='$props.textBody'
  ></AcknowledgementPart>`,
});

AcknowledgementPart.story = {
  name: 'AcknowledgementInitial',
};
