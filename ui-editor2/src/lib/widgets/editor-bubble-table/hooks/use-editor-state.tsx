import {Editor} from '@tiptap/core';
import {useEditorState} from '@tiptap/react';

export const useTableEditorState = (editor: Editor) => {
  return useEditorState({
    editor,
    selector: ({editor}: {editor: Editor}) => ({
      isTable: editor.isActive('table'),
      isTableHeader: editor.isActive('tableHeader'),
      canAddColumnBefore: editor.can().chain().focus().addColumnBefore().run(),
      canAddColumnAfter: editor.can().chain().focus().addColumnAfter().run(),
      canDeleteColumn: editor.can().chain().focus().deleteColumn().run(),
      canAddRowBefore: editor.can().chain().focus().addRowBefore().run(),
      canAddRowAfter: editor.can().chain().focus().addRowAfter().run(),
      canDeleteRow: editor.can().chain().focus().deleteRow().run(),
      canMergeCells: editor.can().chain().focus().mergeCells().run(),
      canSplitCell: editor.can().chain().focus().splitCell().run(),
      canToggleHeaderColumn: editor.can().chain().focus().toggleHeaderColumn().run(),
      canToggleHeaderRow: editor.can().chain().focus().toggleHeaderRow().run(),
      canToggleHeaderCell: editor.can().chain().focus().toggleHeaderCell().run(),
      canDeleteTable: editor.can().chain().focus().deleteTable().run(),
    }),
  });
};
