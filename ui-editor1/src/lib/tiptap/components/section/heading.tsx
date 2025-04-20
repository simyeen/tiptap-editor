import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  cn,
  type toggleVariants,
} from '@kt-web-dev-package/ui-core';
import type {Level} from '@tiptap/extension-heading';
import type {Editor} from '@tiptap/react';
import type {VariantProps} from 'class-variance-authority';
import {
  CheckIcon,
  ChevronDownIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
} from 'lucide-react';
import * as React from 'react';

import type {FormatAction} from '../../type';
import {ShortcutKey} from '../shortcut-key';
import {ToolbarButton} from '../toolbar-button';

interface TextStyle
  extends Omit<FormatAction, 'value' | 'icon' | 'action' | 'isActive' | 'canExecute'> {
  element: keyof JSX.IntrinsicElements;
  level?: Level;
  className: string;
}

const formatActions: TextStyle[] = [
  {
    label: '일반 텍스트',
    element: 'span',
    className: 'grow',
    shortcuts: ['mod', 'alt', '0'],
  },
  {
    label: 'H1',
    element: 'h1',
    level: 1,
    className: 'm-0 grow text-2xl font-extrabold',
    shortcuts: ['mod', 'alt', '1'],
  },
  {
    label: 'H2',
    element: 'h2',
    level: 2,
    className: 'm-0 grow text-xl font-bold',
    shortcuts: ['mod', 'alt', '2'],
  },
  {
    label: 'H3',
    element: 'h3',
    level: 3,
    className: 'm-0 grow text-lg font-semibold',
    shortcuts: ['mod', 'alt', '3'],
  },
  {
    label: 'H4',
    element: 'h4',
    level: 4,
    className: 'm-0 grow text-base font-semibold',
    shortcuts: ['mod', 'alt', '4'],
  },
  {
    label: 'H5',
    element: 'h5',
    level: 5,
    className: 'm-0 grow text-sm font-normal',
    shortcuts: ['mod', 'alt', '5'],
  },
  {
    label: 'H6',
    element: 'h6',
    level: 6,
    className: 'm-0 grow text-sm font-normal',
    shortcuts: ['mod', 'alt', '6'],
  },
];

interface SectionHeadingProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

export function SectionHeading({editor, size, variant}: SectionHeadingProps) {
  const handleStyleChange = React.useCallback(
    (level?: Level) => {
      if (level) {
        editor.chain().focus().toggleHeading({level}).run();
      } else {
        editor.chain().focus().setParagraph().run();
      }
    },
    [editor]
  );

  const renderMenuItem = React.useCallback(
    ({label, element: Element, level, className, shortcuts}: TextStyle) => (
      <DropdownMenuItem
        key={label}
        onClick={() => handleStyleChange(level)}
        className={cn('hover:bg-fg-100 flex flex-row items-center justify-between gap-4', {
          'text-fg-point': level
            ? editor.isActive('heading', {level})
            : editor.isActive('paragraph'),
        })}
        aria-label={label}
      >
        <Element className={cn(className)}>{label}</Element>
        {(level ? editor.isActive('heading', {level}) : editor.isActive('paragraph')) && (
          <CheckIcon className="text-fg-point size-5" />
        )}
        {/* <ShortcutKey keys={shortcuts} /> */}
      </DropdownMenuItem>
    ),
    [editor, handleStyleChange]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          // isActive={editor.isActive('heading')}
          tooltip="글자 서식"
          aria-label="Text styles"
          pressed={editor.isActive('heading')}
          className={cn('mr-3 flex min-w-[85px] justify-between gap-0')}
          disabled={editor.isActive('codeBlock')}
          size={size}
          variant={variant}
        >
          {editor.isActive('heading') ? (
            editor.isActive('heading', {level: 1}) ? (
              <Heading1Icon />
            ) : editor.isActive('heading', {level: 2}) ? (
              <Heading2Icon />
            ) : editor.isActive('heading', {level: 3}) ? (
              <Heading3Icon />
            ) : editor.isActive('heading', {level: 4}) ? (
              <Heading4Icon />
            ) : editor.isActive('heading', {level: 5}) ? (
              <Heading5Icon />
            ) : (
              <Heading6Icon />
            )
          ) : (
            <span className="text-fg-system">일반 텍스트</span>
          )}
          <ChevronDownIcon className="stroke-fg-600" />
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-full min-w-min">
        {formatActions.map(renderMenuItem)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
