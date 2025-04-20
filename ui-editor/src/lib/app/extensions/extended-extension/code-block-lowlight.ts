import {common, createLowlight} from 'lowlight';

import {CodeBlockLowlight} from '@tiptap/extension-code-block-lowlight';

export const ExtendedCodeBlockLowlight = CodeBlockLowlight.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      lowlight: createLowlight(common),
      defaultLanguage: null,
      HTMLAttributes: {
        class: 'block-node',
      },
    };
  },
});

export default ExtendedCodeBlockLowlight;
