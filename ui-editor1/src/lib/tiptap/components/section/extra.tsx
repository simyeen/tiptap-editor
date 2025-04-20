import type {toggleVariants} from '@kt-web-dev-package/ui-core';
import {type Editor, useEditorState} from '@tiptap/react';
import type {VariantProps} from 'class-variance-authority';
import {ChevronDownIcon, CodeIcon, MinusIcon, PlusIcon, QuoteIcon, TableIcon} from 'lucide-react';
import * as React from 'react';

import type {FormatAction} from '../../type';
import {ImageEditDialog} from '../image/image-edit-dialog';
import {LinkEditPopover} from '../link/link-edit-popover';
import {VideoLinkEditPopover} from '../link/video-link-edit-popover';
import {ToolbarSection} from '../toolbar-section';

type InsertElementAction = 'codeBlock' | 'blockquote' | 'horizontalRule' | 'table';
interface InsertElement extends FormatAction {
  value: InsertElementAction;
}

const formatActions: InsertElement[] = [
  {
    value: 'codeBlock',
    label: '코드 블록',
    icon: <CodeIcon className="size-5" />,
    action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive('codeBlock'),
    canExecute: (editor) => editor.can().chain().focus().toggleCodeBlock().run(),
    shortcuts: ['mod', 'alt', 'C'],
  },
  {
    value: 'blockquote',
    label: '인용문',
    icon: <QuoteIcon className="size-5" />,
    action: (editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive('blockquote'),
    canExecute: (editor) => editor.can().chain().focus().toggleBlockquote().run(),
    shortcuts: ['mod', 'shift', 'B'],
  },
  {
    value: 'horizontalRule',
    label: '구분자',
    icon: <MinusIcon className="size-5" />,
    action: (editor) => editor.chain().focus().setHorizontalRule().run(),
    isActive: () => false,
    canExecute: (editor) => editor.can().chain().focus().setHorizontalRule().run(),
    shortcuts: ['mod', 'alt', '-'],
  },
  {
    value: 'table',
    label: '3x3 표 삽입',
    icon: <TableIcon className="size-5" />,
    action: (editor) =>
      editor.chain().focus().insertTable({rows: 3, cols: 3, withHeaderRow: true}).run(),
    isActive: (editor) => editor.isActive('table'),
    canExecute: (editor) => editor.isEditable && editor.can().insertTable(),
    shortcuts: [],
  },
];

interface SectionExtraProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
  activeActions?: InsertElementAction[];
  mainActionCount?: number;
}

export const SectionExtra: React.FC<SectionExtraProps> = ({
  editor,
  activeActions = formatActions.map((action) => action.value),
  mainActionCount = 0,
  size,
  variant,
}) => {
  const editorState = useEditorState({
    editor,
    selector: ({editor}: {editor: Editor}) => ({
      isActiveCodeBlock: editor.isActive('codeBlock'),
      isActiveBlockquote: editor.isActive('blockquote'),
      isActiveHorizontalRule: editor.isActive('horizontalRule'),
      isActiveTable: editor.isActive('table'),
      canExecuteCodeBlock: editor.can().chain().focus().toggleCodeBlock().run(),
      canExecuteBlockquote: editor.can().chain().focus().toggleBlockquote().run(),
      canExecuteHorizontalRule: editor.can().chain().focus().setHorizontalRule().run(),
      canExecuteTable: editor.isEditable && editor.can().insertTable(),
    }),
  });
  return (
    <>
      <LinkEditPopover editor={editor} size={size} variant={variant} />
      <ImageEditDialog editor={editor} size={size} variant={variant} />
      <VideoLinkEditPopover editor={editor} size={size} variant={variant} />
      <ToolbarSection
        editor={editor}
        actions={formatActions}
        activeActions={activeActions}
        mainActionCount={mainActionCount}
        dropdownIcon={
          <>
            <PlusIcon className="size-5" />
            <ChevronDownIcon className="size-5" />
          </>
        }
        dropdownTooltip="Insert elements"
        size={size}
        variant={variant}
      />
    </>
  );
};

SectionExtra.displayName = 'SectionExtra';

export default SectionExtra;
