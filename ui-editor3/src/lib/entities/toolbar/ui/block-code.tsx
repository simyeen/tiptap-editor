import {CodeIcon} from 'lucide-react';

import {useCurrentEditor} from '@tiptap/react';

import {ICON_SIZE, ICON_STROKE_WIDTH} from '../../../shared/constant';
import {Button} from '../../../shared/ui';

export default function BlockCode() {
  const {editor} = useCurrentEditor();

  return (
    <Button
      onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
      disabled={!editor?.can().chain().focus().toggleCodeBlock().run()}
      className={editor?.isActive('codeBlock') ? 'is-active bg-black' : ''}
    >
      <CodeIcon
        size={ICON_SIZE}
        strokeWidth={ICON_STROKE_WIDTH}
        className={!editor?.isActive('codeBlock') ? '' : 'text-white'}
      />
    </Button>
  );
}
