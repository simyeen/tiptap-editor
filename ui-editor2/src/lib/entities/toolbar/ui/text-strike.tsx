import {StrikethroughIcon} from 'lucide-react';

import {useCurrentEditor} from '@tiptap/react';

import {ICON_SIZE, ICON_STROKE_WIDTH} from '../../../shared/constant';
import {Button} from '../../../shared/ui';

export default function TextStrike() {
  const {editor} = useCurrentEditor();

  return (
    <Button
      onClick={() => editor?.chain().focus().toggleStrike().run()}
      disabled={!editor?.can().chain().focus().toggleStrike().run()}
      className={editor?.isActive('strike') ? 'is-active bg-black text-white' : ''}
    >
      <StrikethroughIcon size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
    </Button>
  );
}
