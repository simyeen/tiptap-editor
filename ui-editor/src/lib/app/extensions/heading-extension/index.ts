import Heading from '@tiptap/extension-heading';

const ConfiguredHeading = () =>
  Heading.configure({
    HTMLAttributes: {class: 'heading-node'},
  });

export {ConfiguredHeading};
