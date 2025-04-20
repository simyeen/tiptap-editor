import {AlignJustifyIcon} from 'lucide-react';

import {useCurrentEditor} from '@tiptap/react';

import {ICON_SIZE, ICON_STROKE_WIDTH} from '../../../shared/constant';
import {Button} from '../../../shared/ui';

export default function AlignJustify() {
  const {editor} = useCurrentEditor();
  return (
    <Button onClick={() => editor?.chain().focus().setTextAlign('justify').run()}>
      <AlignJustifyIcon size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
    </Button>
  );
}
