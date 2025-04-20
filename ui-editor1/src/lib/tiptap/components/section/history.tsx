import type {toggleVariants} from '@kt-web-dev-package/ui-core';
import {type Editor, useEditorState} from '@tiptap/react';
import type {VariantProps} from 'class-variance-authority';
import {EllipsisIcon, RedoIcon, UndoIcon} from 'lucide-react';

import type {FormatAction} from '../../type';
import {ToolbarSection} from '../toolbar-section';

type HistoryAction = 'undo' | 'redo';

interface History extends FormatAction {
  value: HistoryAction;
}

const formatActions: History[] = [
  {
    value: 'undo',
    label: '실행 취소',
    icon: <UndoIcon className="size-5" />,
    action: (editor) => editor.chain().focus().undo().run(),
    isActive: (editor) => editor.isActive('undo'),
    canExecute: (editor) => editor.can().chain().focus().undo().run(),
    shortcuts: ['mod', 'Z'],
  },
  {
    value: 'redo',
    label: '다시 실행',
    icon: <RedoIcon className="size-5" />,
    action: (editor) => editor.chain().focus().redo().run(),
    isActive: (editor) => editor.isActive('redo'),
    canExecute: (editor) => editor.can().chain().focus().redo().run(),
    shortcuts: ['mod', 'shift', 'Z'],
  },
];

interface SectionHistoryProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

export function SectionHistory({editor, size, variant}: SectionHistoryProps) {
  const editorState = useEditorState({
    editor,
    selector: ({editor}: {editor: Editor}) => ({
      isActiveUndo: editor.isActive('undo'),
      isActiveRedo: editor.isActive('redo'),
      canExecuteUndo: editor.can().chain().focus().undo().run(),
      canExecuteRedo: editor.can().chain().focus().redo().run(),
    }),
  });
  return (
    <ToolbarSection
      editor={editor}
      actions={formatActions}
      activeActions={formatActions.map((action) => action.value)}
      mainActionCount={formatActions.length}
      dropdownIcon={<EllipsisIcon className="size-5" />}
      dropdownTooltip="More formatting"
      dropdownClassName="w-8"
      size={size}
      variant={variant}
    />
  );
}
