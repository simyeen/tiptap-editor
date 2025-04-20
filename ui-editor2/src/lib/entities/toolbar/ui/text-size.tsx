import clsx from 'clsx';
import {CheckIcon, ChevronDownIcon} from 'lucide-react';
import React, {useEffect} from 'react';

import {Level} from '@tiptap/extension-heading';
import {useCurrentEditor} from '@tiptap/react';

import {ICON_SIZE, ICON_STROKE_WIDTH} from '../../../shared/constant';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../../../shared/ui';

export default function TextSize() {
  const {editor} = useCurrentEditor();
  const [sizeTitle, setSizeTitle] = React.useState('일반 텍스트');

  const headingSizes: Record<Level, string> = {
    1: 'text-2xl',
    2: 'text-xl',
    3: 'text-lg',
    4: 'text-base',
    5: 'text-sm',
    6: 'text-xs',
  };

  useEffect(() => {
    if (editor?.isActive('paragraph')) {
      setSizeTitle('일반 텍스트');
    } else {
      const level = editor?.getAttributes('heading')?.level;
      if (level) {
        setSizeTitle(`H${level}`);
      }
    }
  }, [editor?.state]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex w-24 cursor-pointer items-center justify-between gap-2">
          <p className="text-sm">{sizeTitle}</p>
          <ChevronDownIcon size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 cursor-pointer">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => editor?.chain().focus().setParagraph().run()}
            className={clsx(editor?.isActive('paragraph') && 'is-active text-red-500')}
          >
            <p className="text-sm">일반 텍스트</p>
            {editor?.isActive('paragraph') && (
              <DropdownMenuShortcut>
                <CheckIcon />
              </DropdownMenuShortcut>
            )}
          </DropdownMenuItem>

          {Object.keys(headingSizes).map((key) => {
            const level = Number(key) as Level;
            return (
              <DropdownMenuItem
                key={level}
                onClick={() => editor?.chain().focus().toggleHeading({level}).run()}
                className={clsx(editor?.isActive('heading', {level}) && 'is-active text-red-500')}
              >
                {React.createElement(`h${level}`, {className: headingSizes[level]}, `H${level}`)}
                {editor?.isActive('heading', {level}) && (
                  <DropdownMenuShortcut>
                    <CheckIcon />
                  </DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
