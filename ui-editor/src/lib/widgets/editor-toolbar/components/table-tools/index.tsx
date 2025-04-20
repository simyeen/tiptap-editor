import type {VariantProps} from 'class-variance-authority';
import {TableIcon} from 'lucide-react';

import {type Editor, useEditorState} from '@tiptap/react';

import {ToolbarMenu} from '../../../../features';
import {toggleVariants} from '../../../../shared/shadcn';
import {InsertElementAction} from '../../types/block';

interface SectionExtraProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
  activeActions?: InsertElementAction[];
  mainActionCount?: number;
}

export default function TableTools({editor, size, variant}: SectionExtraProps) {
  const {isActiveTable, canExecuteTable} = useEditorState({
    editor,
    selector: ({editor}: {editor: Editor}) => ({
      isActiveTable: editor.isActive('table'),
      canExecuteTable: editor.isEditable && editor.can().insertTable(),
    }),
  });
  const TableOptions = [
    {
      value: 'table',
      label: '3x3 표 삽입',
      icon: <TableIcon className="size-5" />,
      action: () =>
        editor.chain().focus().insertTable({rows: 3, cols: 3, withHeaderRow: true}).run(),
      isActive: isActiveTable,
      canExecute: canExecuteTable,
      shortcuts: [],
    },
  ];

  return <ToolbarMenu actions={TableOptions} size={size} variant={variant} />;
}
