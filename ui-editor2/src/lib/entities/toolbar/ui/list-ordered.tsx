import {ListOrderedIcon} from 'lucide-react';

import {useCurrentEditor} from '@tiptap/react';

import {ICON_SIZE, ICON_STROKE_WIDTH} from '../../../shared/constant';
import {Button} from '../../../shared/ui';

export default function ListOrdered() {
  const {editor} = useCurrentEditor();

  return (
    <Button onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
      <ListOrderedIcon size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
    </Button>
  );
}
