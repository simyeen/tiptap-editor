import {AlignRightIcon} from 'lucide-react';

import {useCurrentEditor} from '@tiptap/react';

import {ICON_SIZE, ICON_STROKE_WIDTH} from '../../../shared/constant';
import {Button} from '../../../shared/ui';

export default function AlignRight() {
  const {editor} = useCurrentEditor();

  return (
    <Button onClick={() => editor?.chain().focus().setTextAlign('right').run()}>
      <AlignRightIcon size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
    </Button>
  );
}
