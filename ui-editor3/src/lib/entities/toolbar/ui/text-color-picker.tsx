import {TypeIcon} from 'lucide-react';
import React, {useRef, useState} from 'react';

import {useCurrentEditor} from '@tiptap/react';

import {ICON_SIZE, ICON_STROKE_WIDTH} from '../../../shared/constant';

export default function TextColorPicker() {
  const {editor} = useCurrentEditor();

  const [selectedColor, setSelectedColor] = useState('#000000');
  const openColorPicker = () => {
    colorInputRef.current?.click();
  };
  const colorInputRef = useRef<HTMLInputElement>(null);
  const updateColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
    editor?.chain().focus().setColor(event.target.value).run();
  };

  return (
    <div
      className={
        'grid cursor-pointer grid-cols-1 place-items-center rounded-md px-2 py-1 transition-colors hover:bg-fg-100 hover:text-gray-500'
      }
      onClick={openColorPicker}
    >
      <TypeIcon size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
      <div className={'mt-1 h-1 w-5'} style={{backgroundColor: selectedColor}} />
      <input
        type="color"
        ref={colorInputRef}
        value={selectedColor}
        onChange={updateColor}
        className={'mt-1 h-0 w-0'}
      />
    </div>
  );
}
