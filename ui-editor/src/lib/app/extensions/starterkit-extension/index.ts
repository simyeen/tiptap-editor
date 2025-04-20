import StarterKit from '@tiptap/starter-kit';

const ConfiguredStarterKit = () =>
  StarterKit.configure({
    horizontalRule: false,
    codeBlock: false,
    heading: false,
    paragraph: {HTMLAttributes: {class: 'text-node'}},
    blockquote: {HTMLAttributes: {class: 'block-node'}},
    bulletList: {HTMLAttributes: {class: 'list-node'}},
    orderedList: {HTMLAttributes: {class: 'list-node'}},
    code: {HTMLAttributes: {class: 'inline', spellcheck: 'false'}},
    dropcursor: {width: 2, class: 'ProseMirror-dropcursor border'},
  });

export {ConfiguredStarterKit};
