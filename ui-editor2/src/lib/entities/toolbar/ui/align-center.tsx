import {AlignCenterIcon} from 'lucide-react';

import {useCurrentEditor} from '@tiptap/react';

import {ICON_SIZE, ICON_STROKE_WIDTH} from '../../../shared/constant';
import {Button} from '../../../shared/ui';

export default function AlignCenter() {
  const {editor} = useCurrentEditor();

  return (
    <Button onClick={() => editor?.chain().focus().setTextAlign('center').run()}>
      <AlignCenterIcon size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
    </Button>
  );
}
