import {QuoteIcon} from 'lucide-react';

import {useCurrentEditor} from '@tiptap/react';

import {ICON_SIZE, ICON_STROKE_WIDTH} from '../../../shared/constant';
import {Button} from '../../../shared/ui';

export default function BlockQuote() {
  const {editor} = useCurrentEditor();

  return (
    <Button
      onClick={() => editor?.chain().focus().toggleBlockquote().run()}
      disabled={!editor?.can().chain().focus().toggleBlockquote().run()}
      className={editor?.isActive('blockquote') ? 'is-active bg-black' : ''}
    >
      <QuoteIcon
        size={ICON_SIZE}
        strokeWidth={ICON_STROKE_WIDTH}
        className={!editor?.isActive('blockquote') ? 'fill-fg-900 stroke-none' : 'fill-fg-white'}
      />
    </Button>
  );
}
