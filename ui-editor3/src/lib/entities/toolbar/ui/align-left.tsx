import {AlignLeftIcon} from 'lucide-react';

import {useCurrentEditor} from '@tiptap/react';

import {ICON_SIZE, ICON_STROKE_WIDTH} from '../../../shared/constant';
import {Button} from '../../../shared/ui';

export default function AlignLeft() {
  const {editor} = useCurrentEditor();

  return (
    <Button onClick={() => editor?.chain().focus().setTextAlign('left').run()}>
      <AlignLeftIcon size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
    </Button>
  );
}
