import {Superscript} from '@tiptap/extension-superscript';

export const ExtendedSuperscript = Superscript.extend({
  excludes: 'subscript',
});
