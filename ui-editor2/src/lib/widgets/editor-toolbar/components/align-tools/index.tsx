import type {VariantProps} from 'class-variance-authority';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ChevronDownIcon,
} from 'lucide-react';

import {cn} from '@shared/ui-theme';
import {type Editor, useEditorState} from '@tiptap/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  type toggleVariants,
} from '../../../../shared/shadcn';
import {FormatAction} from '../../../../shared/types';
import {AppToolbarButton} from '../../../../shared/ui';

interface TextStyle extends Omit<FormatAction, 'canExecute' | 'shortcuts'> {}

interface SectionTextAlignProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

export default function AlignTools({editor, size, variant}: SectionTextAlignProps) {
  const {isActiveAlignCenter, isActiveAlignJustify, isActiveAlignLeft, isActiveAlignRight} =
    useEditorState({
      editor,
      selector: ({editor}: {editor: Editor}) => ({
        isActiveAlignLeft: editor.isActive({textAlign: 'left'}),
        isActiveAlignCenter: editor.isActive({textAlign: 'center'}),
        isActiveAlignRight: editor.isActive({textAlign: 'right'}),
        isActiveAlignJustify: editor.isActive({textAlign: 'justify'}),
      }),
    });
  const alignOptions: TextStyle[] = [
    {
      value: 'left',
      label: '왼쪽 정렬',
      icon: <AlignLeftIcon className="size-5" />,
      action: () => editor.chain().focus().setTextAlign('left').run(),
      isActive: isActiveAlignLeft,
    },
    {
      value: 'center',
      label: '가운데 정렬',
      icon: <AlignCenterIcon className="size-5" />,
      action: () => editor.chain().focus().setTextAlign('center').run(),
      isActive: isActiveAlignCenter,
    },
    {
      value: 'right',
      label: '오른쪽 정렬',
      icon: <AlignRightIcon className="size-5" />,
      action: () => editor.chain().focus().setTextAlign('right').run(),
      isActive: isActiveAlignRight,
    },
    {
      value: 'justify',
      label: '양쪽 정렬',
      icon: <AlignJustifyIcon className="size-5" />,
      action: () => editor.chain().focus().setTextAlign('justify').run(),
      isActive: isActiveAlignJustify,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AppToolbarButton
          tooltip="글자 정렬"
          aria-label="Text aligns"
          className="flex min-w-[45px] justify-between pl-2"
          disabled={editor.isActive('codeBlock')}
          size={size}
          variant={variant}
        >
          {alignOptions.filter(({isActive}) => isActive).at(0)?.icon || (
            <AlignLeftIcon className="size-5" />
          )}
          <ChevronDownIcon className="size-5" />
        </AppToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-full min-w-min">
        {alignOptions.map(({label, isActive, icon, action}) => (
          <DropdownMenuItem
            key={label}
            onClick={action}
            className={cn('flex flex-row items-center justify-between gap-4 hover:bg-fg-100', {
              'text-fg-point': isActive,
            })}
            aria-label={label}
          >
            {icon}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
