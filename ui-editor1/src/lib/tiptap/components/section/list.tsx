import type {toggleVariants} from '@kt-web-dev-package/ui-core';
import {type Editor, useEditorState} from '@tiptap/react';
import type {VariantProps} from 'class-variance-authority';
import {ChevronDownIcon, ListChecksIcon, ListIcon, ListOrderedIcon} from 'lucide-react';
import * as React from 'react';

import type {FormatAction} from '../../type';
import {ToolbarSection} from '../toolbar-section';

type ListItemAction = 'orderedList' | 'bulletList' | 'taskList';
interface ListItem extends FormatAction {
  value: ListItemAction;
}

const formatActions: ListItem[] = [
  {
    value: 'orderedList',
    label: '숫자 목록',
    icon: <ListOrderedIcon className="size-5" />,
    isActive: (editor) => editor.isActive('orderedList'),
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    canExecute: (editor) => editor.can().chain().focus().toggleOrderedList().run(),
    shortcuts: ['mod', 'shift', '7'],
  },
  {
    value: 'bulletList',
    label: '기호 목록',
    icon: <ListIcon className="size-5" />,
    isActive: (editor) => editor.isActive('bulletList'),
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
    canExecute: (editor) => editor.can().chain().focus().toggleBulletList().run(),
    shortcuts: ['mod', 'shift', '8'],
  },
  {
    value: 'taskList',
    label: '작업 목록',
    icon: <ListChecksIcon className="size-5" />,
    isActive: (editor) => editor.isActive('taskList') && editor.isActive('taskItem'),
    action: (editor) => editor.chain().focus().toggleTaskList().run(),
    canExecute: (editor) => editor.can().chain().focus().toggleTaskList().run(),
    shortcuts: ['mod', 'shift', '9'],
  },
];

interface SectionListProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
  activeActions?: ListItemAction[];
  mainActionCount?: number;
}

export const SectionList: React.FC<SectionListProps> = ({
  editor,
  activeActions = formatActions.map((action) => action.value),
  mainActionCount = 0,
  size,
  variant,
}) => {
  const editorState = useEditorState({
    editor,
    selector: ({editor}: {editor: Editor}) => ({
      isActiveOrderedList: editor.isActive('orderedList'),
      isActiveBulletList: editor.isActive('bulletList'),
      isActiveTaskList: editor.isActive('taskList'),
      canExecuteOrderedList: editor.can().chain().focus().toggleOrderedList().run(),
      canExecuteBulletList: editor.can().chain().focus().toggleBulletList().run(),
      canExecuteTaskList: editor.can().chain().focus().toggleTaskList().run(),
    }),
  });
  return (
    <ToolbarSection
      editor={editor}
      actions={formatActions}
      activeActions={activeActions}
      mainActionCount={mainActionCount}
      dropdownIcon={
        <>
          <ListIcon className="size-5" />
          <ChevronDownIcon className="size-5" />
        </>
      }
      dropdownTooltip="Lists"
      size={size}
      variant={variant}
    />
  );
};

SectionList.displayName = 'SectionList';

export default SectionList;
