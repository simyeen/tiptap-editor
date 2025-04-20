import {ImageIcon} from 'lucide-react';
import {useRef} from 'react';

import {useCurrentEditor} from '@tiptap/react';

import {ICON_SIZE, ICON_STROKE_WIDTH} from '../../../shared/constant';
import {Button} from '../../../shared/ui';

export default function Image() {
  const {editor} = useCurrentEditor();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const _options = {
      src: imageUrl,
      alt: '내 이미지',
      title: '이미지 이름',
    };

    editor?.chain().focus().setImage(_options).run();
  };

  return (
    <>
      <Button onClick={handleImageUpload}>
        <ImageIcon size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
      </Button>
      <input
        className="hidden"
        type="file"
        // accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </>
  );
}
