import type {Editor} from '@tiptap/react';
import {BubbleMenu, useEditorState} from '@tiptap/react';
import {EraserIcon, PaintBucketIcon} from 'lucide-react';
import * as React from 'react';
import {
  RiDeleteColumn,
  RiDeleteRow,
  RiInsertColumnLeft,
  RiInsertColumnRight,
  RiInsertRowBottom,
  RiInsertRowTop,
  RiLayoutColumnFill,
  RiLayoutRowFill,
  RiMergeCellsHorizontal,
  RiSplitCellsHorizontal,
} from 'react-icons/ri';

import {TablePopoverBlock} from '../link';

interface TableBubbleMenuProps {
  editor: Editor;
}

export interface TableToolbarButtonProps {
  tooltip: string;
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  hasDivider?: boolean;
  isActive?: boolean;
}

export const TableBubbleMenu: React.FC<TableBubbleMenuProps> = ({editor}) => {
  const editorState = useEditorState({
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

  const tableToolbarButtons: TableToolbarButtonProps[] = [
    {
      tooltip: '이전 열에 셀 추가',
      icon: <RiInsertColumnLeft className="size-4" />,
      onClick: () => editor.chain().focus().addColumnBefore().run(),
      disabled: !editorState.canAddColumnBefore,
    },
    {
      tooltip: '다음 열에 셀 추가',
      icon: <RiInsertColumnRight className="size-4" />,
      onClick: () => editor.chain().focus().addColumnAfter().run(),
      disabled: !editorState.canAddColumnAfter,
    },
    {
      tooltip: '열 삭제',
      icon: <RiDeleteColumn className="size-4" />,
      onClick: () => editor.chain().focus().deleteColumn().run(),
      disabled: !editorState.canDeleteColumn,
      hasDivider: true,
    },
    {
      tooltip: '이전 행에 셀 추가',
      icon: <RiInsertRowTop className="size-4" />,
      onClick: () => editor.chain().focus().addRowBefore().run(),
      disabled: !editorState.canAddRowBefore,
    },
    {
      tooltip: '다음 행에 셀 추가',
      icon: <RiInsertRowBottom className="size-4" />,
      onClick: () => editor.chain().focus().addRowAfter().run(),
      disabled: !editorState.canAddRowAfter,
    },
    {
      tooltip: '행 삭제',
      icon: <RiDeleteRow className="size-4" />,
      onClick: () => editor.chain().focus().deleteRow().run(),
      disabled: !editorState.canDeleteRow,
      hasDivider: true,
    },
    {
      tooltip: '셀 합하기',
      icon: <RiMergeCellsHorizontal className="size-4" />,
      onClick: () => editor.chain().focus().mergeCells().run(),
      disabled: !editorState.canMergeCells,
    },
    {
      tooltip: '셀 나누기',
      icon: <RiSplitCellsHorizontal className="size-4" />,
      onClick: () => editor.chain().focus().splitCell().run(),
      hasDivider: true,
      disabled: !editorState.canSplitCell,
    },
    {
      tooltip: '헤더 열 지정/해제',
      icon: <RiLayoutColumnFill className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeaderColumn().run(),
      disabled: !editorState.canToggleHeaderColumn,
    },
    {
      tooltip: '헤더 행 지정/해제',
      icon: <RiLayoutRowFill className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeaderRow().run(),
      disabled: !editorState.canToggleHeaderRow,
    },
    {
      tooltip: '헤더 셀 지정/해제',
      icon: <PaintBucketIcon className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeaderCell().run(),
      disabled: !editorState.canToggleHeaderCell,
      isActive: editorState.isTable && editorState.isTableHeader,
      hasDivider: true,
    },
    {
      tooltip: '테이블 삭제',
      icon: <EraserIcon className="size-4" />,
      onClick: () => editor.chain().focus().deleteTable().run(),
      disabled: !editorState.canDeleteTable,
    },
  ];

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={() => editor.isActive('table')}
      tippyOptions={{
        maxWidth: '100%',
        placement: 'bottom',
        zIndex: 5,
      }}
    >
      <TablePopoverBlock tableToolbarButtons={tableToolbarButtons} />
    </BubbleMenu>
  );
};
