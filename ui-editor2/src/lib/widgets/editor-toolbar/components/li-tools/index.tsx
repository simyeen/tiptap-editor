import type {VariantProps} from 'class-variance-authority';
import {ListIcon, ListOrderedIcon} from 'lucide-react';

import {type Editor, useEditorState} from '@tiptap/react';

import {ToolbarMenu} from '../../../../features';
import {toggleVariants} from '../../../../shared/shadcn';
import {FormatAction} from '../../../../shared/types';

type ListItemAction = 'orderedList' | 'bulletList' | 'taskList';
interface ListItem extends FormatAction {
  value: ListItemAction;
}

interface SectionListProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

export default function LiTools({editor, size, variant}: SectionListProps) {
  const {isActiveOrderedList, isActiveBulletList, canExecuteOrderedList, canExecuteBulletList} =
    useEditorState({
      editor,
      selector: ({editor}: {editor: Editor}) => ({
        isActiveOrderedList: editor.isActive('orderedList'),
        isActiveBulletList: editor.isActive('bulletList'),
        canExecuteOrderedList: editor.can().chain().focus().toggleOrderedList().run(),
        canExecuteBulletList: editor.can().chain().focus().toggleBulletList().run(),
      }),
    });
  const LiOptions: ListItem[] = [
    {
      value: 'orderedList',
      label: '숫자 목록',
      icon: <ListOrderedIcon className="size-5" />,
      isActive: isActiveOrderedList,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      canExecute: canExecuteOrderedList,
      shortcuts: ['mod', 'shift', '7'],
    },
    {
      value: 'bulletList',
      label: '기호 목록',
      icon: <ListIcon className="size-5" />,
      isActive: isActiveBulletList,
      action: () => editor.chain().focus().toggleBulletList().run(),
      canExecute: canExecuteBulletList,
      shortcuts: ['mod', 'shift', '8'],
    },
  ];
  return <ToolbarMenu actions={LiOptions} size={size} variant={variant} />;
}
