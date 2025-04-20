// import {Editor} from '@tiptap/core';
// import {Plugin, TextSelection} from '@tiptap/pm/state';
// import type {EditorView} from '@tiptap/pm/view';
// import {getMarkRange} from '@tiptap/react';

// export const LinkPlugin = (editor: Editor) =>
//   new Plugin({
//     props: {
//       handleKeyDown: (_: EditorView, event: KeyboardEvent) => {
//         const {selection} = editor.state;

//         /*
//          * Handles the 'Escape' key press when there's a selection within the link.
//          * This will move the cursor to the end of the link.
//          */
//         if (event.key === 'Escape' && selection.empty !== true) {
//           editor.commands.focus(selection.to, {scrollIntoView: false});
//         }

//         return false;
//       },
//       handleClick(view, pos) {
//         /*
//          * Marks the entire link when the user clicks on it.
//          */

//         const {schema, doc, tr} = view.state;
//         const range = getMarkRange(doc.resolve(pos), schema.marks.link);

//         if (!range) {
//           return;
//         }

//         const {from, to} = range;
//         const start = Math.min(from, to);
//         const end = Math.max(from, to);

//         if (pos < start || pos > end) {
//           return;
//         }

//         const $start = doc.resolve(start);
//         const $end = doc.resolve(end);
//         const transaction = tr.setSelection(new TextSelection($start, $end));

//         view.dispatch(transaction);
//       },
//     },
//   });

// export default LinkPlugin;
