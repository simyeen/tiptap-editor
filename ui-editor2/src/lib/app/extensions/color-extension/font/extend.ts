import {Color} from '@tiptap/extension-color';

import fontColorPlugin from './plugin';

export const ExtendedColor = Color.extend({
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: 'hsl(var(--foreground))',
            parseHTML: (element) => element.style.color?.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.color) {
                return {};
              }

              return {
                style: `color: ${attributes.color}`,
              };
            },
          },
        },
      },
    ];
  },
  addProseMirrorPlugins() {
    const {editor} = this;

    return [...(this.parent?.() || []), fontColorPlugin(editor)];
  },
});
