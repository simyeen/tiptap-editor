import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  type toggleVariants,
} from '@kt-web-dev-package/ui-core';
import type {Editor} from '@tiptap/react';
import type {VariantProps} from 'class-variance-authority';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ChevronDownIcon,
} from 'lucide-react';
import * as React from 'react';

import type {FormatAction} from '../../type';
import {ToolbarButton} from '../toolbar-button';

interface TextStyle
  extends Omit<FormatAction, 'icon' | 'action' | 'canExecute' | 'isActive' | 'shortcuts'> {
  element: React.ReactNode;
}

const formatActions: TextStyle[] = [
  {
    value: 'left',
    label: '왼쪽 정렬',
    element: <AlignLeftIcon className="size-5" />,
  },
  {
    value: 'center',
    label: '가운데 정렬',
    element: <AlignCenterIcon className="size-5" />,
  },
  {
    value: 'right',
    label: '오른쪽 정렬',
    element: <AlignRightIcon className="size-5" />,
  },
  {
    value: 'justify',
    label: '양쪽 정렬',
    element: <AlignJustifyIcon className="size-5" />,
  },
];

interface SectionTextAlignProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

export function SectionTextAlign({editor, size, variant}: SectionTextAlignProps) {
  const handleStyleChange = React.useCallback(
    (value: string) => {
      editor.chain().focus().setTextAlign(value).run();
    },
    [editor]
  );

  const renderMenuItem = React.useCallback(
    ({label, value, element}: TextStyle) => (
      <DropdownMenuItem
        key={label}
        onClick={() => handleStyleChange(value)}
        className={cn('hover:bg-fg-100 flex flex-row items-center justify-between gap-4', {
          'text-fg-point': editor.isActive({textAlign: value}),
        })}
        aria-label={label}
      >
        {element}
      </DropdownMenuItem>
    ),
    [editor, handleStyleChange]
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ToolbarButton
            tooltip="글자 정렬"
            aria-label="Text aligns"
            className="flex min-w-[45px] justify-between"
            disabled={editor.isActive('codeBlock')}
            size={size}
            variant={variant}
          >
            {editor.isActive({textAlign: 'left'}) ? (
              <AlignLeftIcon className="size-5" />
            ) : editor.isActive({textAlign: 'center'}) ? (
              <AlignCenterIcon className="size-5" />
            ) : editor.isActive({textAlign: 'right'}) ? (
              <AlignRightIcon className="size-5" />
            ) : editor.isActive({textAlign: 'justify'}) ? (
              <AlignJustifyIcon className="size-5" />
            ) : (
              <></>
            )}
            <ChevronDownIcon className="size-5" />
          </ToolbarButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-full min-w-min">
          {formatActions.map(renderMenuItem)}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
