import {EraserIcon, PaintBucketIcon} from 'lucide-react';
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

import {TableToolbarButtonProps} from '../../../shared/types';

// 테이블 툴바 버튼 데이터
export const BubbleOptions = (editor: any, editorState: any): TableToolbarButtonProps[] => [
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
    disabled: !editorState.canSplitCell,
    hasDivider: true,
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
