import {ListIcon} from 'lucide-react';

import {useCurrentEditor} from '@tiptap/react';

import {ICON_SIZE, ICON_STROKE_WIDTH} from '../../../shared/constant';
import {Button} from '../../../shared/ui';

export default function ListBullet() {
  const {editor} = useCurrentEditor();

  return (
    <Button onClick={() => editor?.chain().focus().toggleBulletList().run()}>
      <ListIcon size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
    </Button>
  );
}
