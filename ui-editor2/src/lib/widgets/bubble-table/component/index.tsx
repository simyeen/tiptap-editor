import {PaintBucketIcon, Trash2, X} from 'lucide-react';
import {
  RiDeleteColumn,
  RiDeleteRow,
  RiInsertColumnLeft,
  RiInsertColumnRight,
  RiInsertRowBottom,
  RiInsertRowTop,
  RiMergeCellsHorizontal,
  RiSplitCellsHorizontal,
} from 'react-icons/ri';

import {BubbleMenu, useCurrentEditor} from '@tiptap/react';

import {ICON_SIZE} from '../../../shared/constant';
import {Button} from '../../../shared/ui';
import Separator from '../../toolbar/component/separator';

export default function Component() {
  const {editor} = useCurrentEditor();

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={() => (editor ? editor.isActive('table') : false)}
      tippyOptions={{
        maxWidth: '100%',
        placement: 'top',
        zIndex: 5,
      }}
    >
      <div className="flex gap-1 rounded bg-background p-2 shadow-lg">
        <Button onClick={() => editor?.chain().focus().addColumnBefore().run()}>
          <RiInsertColumnLeft />
        </Button>

        <Button onClick={() => editor?.chain().focus().addColumnAfter().run()}>
          <RiInsertColumnRight />
        </Button>

        <Button onClick={() => editor?.chain().focus().deleteColumn().run()}>
          <RiDeleteColumn />
        </Button>

        <Separator />

        <Button onClick={() => editor?.chain().focus().addRowBefore().run()}>
          <RiInsertRowTop />
        </Button>

        <Button onClick={() => editor?.chain().focus().addRowAfter().run()}>
          <RiInsertRowBottom />
        </Button>

        <Button onClick={() => editor?.chain().focus().deleteRow().run()}>
          <RiDeleteRow />
        </Button>

        <Separator />

        <Button onClick={() => editor?.chain().focus().mergeCells().run()}>
          <RiMergeCellsHorizontal />
        </Button>

        <Button onClick={() => editor?.chain().focus().splitCell().run()}>
          <RiSplitCellsHorizontal />
        </Button>

        <Separator />

        <Button onClick={() => editor?.chain().focus().toggleHeaderCell().run()}>
          <PaintBucketIcon size={ICON_SIZE} />
        </Button>

        <Separator />

        <Button onClick={() => editor?.chain().focus().deleteTable().run()}>
          <Trash2 size={ICON_SIZE} />
        </Button>
      </div>
    </BubbleMenu>
  );
}
