import {ItalicIcon} from 'lucide-react';

import {useCurrentEditor} from '@tiptap/react';

import {ICON_SIZE, ICON_STROKE_WIDTH} from '../../../shared/constant';
import {Button} from '../../../shared/ui';

export default function TextItalic() {
  const {editor} = useCurrentEditor();

  return (
    <Button
      onClick={() => editor?.chain().focus().toggleItalic().run()}
      disabled={!editor?.can().chain().focus().toggleItalic().run()}
      className={editor?.isActive('italic') ? 'is-active bg-black text-white' : ''}
    >
      <ItalicIcon size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
    </Button>
  );
}
