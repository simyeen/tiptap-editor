import TiptapLink from '@tiptap/extension-link';
import {mergeAttributes} from '@tiptap/react';

// import LinkPlugin from './plugin';

export const ExtendedLink = TiptapLink.extend({
  /*
   * Determines whether typing next to a link automatically becomes part of the link.
   * In this case, we dont want any characters to be included as part of the link.
   */
  inclusive: false,

  /*
   * Match all <a> elements that have an href attribute, except for:
   * - <a> elements with a data-type attribute set to button
   * - <a> elements with an href attribute that contains 'javascript:'
   */
  parseHTML() {
    return [{tag: 'a[href]:not([data-type="button"]):not([href *= "javascript:" i])'}];
  },

  renderHTML({HTMLAttributes}) {
    return ['a', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addOptions() {
    return {
      ...this.parent?.(),
      openOnClick: false,
      HTMLAttributes: {
        class: 'link',
      },
    };
  },

  // addProseMirrorPlugins() {
  //   const {editor} = this;

  //   return [...(this.parent?.() || []), LinkPlugin(editor)];
  // },
});
