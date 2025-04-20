import {Placeholder} from '@tiptap/extension-placeholder';

const ConfiguredPlaceholder = (placeholder: string) =>
  Placeholder.configure({
    placeholder: () => placeholder,
    emptyNodeClass: 'text-fg-500',
  });

export {ConfiguredPlaceholder};
