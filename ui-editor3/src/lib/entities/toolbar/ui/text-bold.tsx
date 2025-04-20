import {BoldIcon} from 'lucide-react';

import {useCurrentEditor} from '@tiptap/react';

import {ICON_SIZE, ICON_STROKE_WIDTH} from '../../../shared/constant';
import {Button} from '../../../shared/ui';

export default function TextBold() {
  const {editor} = useCurrentEditor();

  return (
    <Button
      onClick={() => editor?.chain().focus().toggleBold().run()}
      disabled={!editor?.can().chain().focus().toggleBold().run()}
      className={editor?.isActive('bold') ? 'is-active bg-black text-white' : ''}
    >
      <BoldIcon size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
    </Button>
  );
}
