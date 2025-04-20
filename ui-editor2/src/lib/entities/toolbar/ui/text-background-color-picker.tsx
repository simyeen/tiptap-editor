import {HighlighterIcon} from 'lucide-react';
import React, {useRef, useState} from 'react';

import {useCurrentEditor} from '@tiptap/react';

import {ICON_SIZE, ICON_STROKE_WIDTH} from '../../../shared/constant';

export default function TextBackgroundColorPicker() {
  const {editor} = useCurrentEditor();

  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('#ffffff');
  const backgroundColorInputRef = useRef<HTMLInputElement>(null);

  const openBackgroundColorPicker = () => {
    backgroundColorInputRef.current?.click();
  };

  const updateBackgroundColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setSelectedBackgroundColor(color);
    editor?.chain().focus().toggleHighlight({color}).run();
  };

  return (
    <div
      className={
        'grid cursor-pointer grid-cols-1 place-items-center rounded-md px-2 py-1 transition-colors hover:bg-fg-100 hover:text-gray-500'
      }
      onClick={openBackgroundColorPicker}
    >
      <HighlighterIcon size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
      <div className={'mt-1 h-1 w-5'} style={{backgroundColor: selectedBackgroundColor}} />
      <input
        type="color"
        ref={backgroundColorInputRef}
        value={selectedBackgroundColor}
        onChange={updateBackgroundColor}
        className={'mt-1 h-0 w-0'}
      />
    </div>
  );
}
