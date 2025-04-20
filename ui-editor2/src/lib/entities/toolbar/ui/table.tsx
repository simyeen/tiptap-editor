import {Table} from 'lucide-react';

import {useCurrentEditor} from '@tiptap/react';

import {ICON_SIZE, ICON_STROKE_WIDTH} from '../../../shared/constant';
import {Button} from '../../../shared/ui';

export default function Redo() {
  const {editor} = useCurrentEditor();

  return (
    <Button
      onClick={() => {
        editor?.chain().focus().insertTable({rows: 3, cols: 3, withHeaderRow: true}).run();
      }}
    >
      <Table size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
    </Button>
  );
}
