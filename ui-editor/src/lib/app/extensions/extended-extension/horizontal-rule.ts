import {HorizontalRule} from '@tiptap/extension-horizontal-rule';

export const ExtendedHorizontalRule = HorizontalRule.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-Alt--': () =>
        this.editor.commands.insertContent({
          type: this.name,
        }),
    };
  },
});

export default ExtendedHorizontalRule;
